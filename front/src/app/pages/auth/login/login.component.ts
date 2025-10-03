import { Component, OnInit, ElementRef, ViewChild, inject, signal, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Subject, takeUntil } from 'rxjs';
import { AuthService, LoginCredentials } from '../../../core/services/auth.service';
import { LoadingService } from '../../../core/services/loading.service';
import { LoginError } from '../../../core/services/error-handler.service';
import { CustomValidators } from '../../../core/validators/custom-validators';
import { Brand } from '../../../components/brand/brand';
import { Router } from '@angular/router';
import { FormGeneratorComponent } from '../../../components/form-generator/form-generator';
import { FormConfig } from '../../../components/form-generator/interfaces';
import { loginFormConfig } from '../../../components/form-generator/forms_scaffolders/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormGeneratorComponent,
    Brand,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('emailInput') emailInput!: ElementRef;

  loginConfig: FormConfig = loginFormConfig;
  isPasswordVisible = false;

  // Unsubscribe subject for cleanup
  private readonly destroy$ = new Subject<void>();

  // Error handling
  private readonly errorSignal = signal<LoginError | null>(null);
  readonly error = this.errorSignal.asReadonly();

  // Services
  private readonly authService = inject(AuthService);
  private readonly loadingService = inject(LoadingService);
  private router = inject(Router)

  // Computed loading state from service
  readonly loading = this.loadingService.loading;

  constructor() { }

  ngOnInit(): void {
    // Focus management and accessibility setup
    setTimeout(() => {
      const firstInput = document.getElementById('email');
      if (firstInput) {
        firstInput.focus();
      }
    }, 100);
  }

  onSubmit(event: Event): void {
    this.errorSignal.set(null);

    this.router.navigate(['/dashboard'])
  }

  onGoogleLogin(): void {
    // Clear any previous errors
    this.errorSignal.set(null);

    // Console log for e2e testing
    this.authService.loginWithGoogle().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        if (response.success) {
          // TODO: Navigate to dashboard or intended page
        } else if (response.error) {
          this.errorSignal.set(response.error);
        }
      },
      error: (_error) => {
        this.errorSignal.set({
          type: 'server',
          message: 'Error inesperado en la autenticación con Google.',
          code: 'GOOGLE_UNEXPECTED_ERROR'
        });
      }
    });
  }

  // Helper method to check if currently loading
  isCurrentlyLoading(): boolean {
    return this.loading().isLoading;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
