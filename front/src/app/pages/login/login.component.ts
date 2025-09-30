import { Component, OnInit, ElementRef, ViewChild, inject, signal, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService, LoginCredentials } from '../../core/services/auth.service';
import { LoadingService } from '../../core/services/loading.service';
import { LoginError } from '../../core/services/error-handler.service';
import { CustomValidators } from '../../core/validators/custom-validators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('emailInput') emailInput!: ElementRef;

  loginForm: FormGroup;
  isPasswordVisible = false;

  // Unsubscribe subject for cleanup
  private readonly destroy$ = new Subject<void>();

  // Error handling
  private readonly errorSignal = signal<LoginError | null>(null);
  readonly error = this.errorSignal.asReadonly();

  // Services
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly loadingService = inject(LoadingService);
  private readonly router = inject(Router);

  // Computed loading state from service
  readonly loading = this.loadingService.loading;

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        CustomValidators.noWhitespace(),
        CustomValidators.emailFormat()
      ]],
      password: ['', [
        Validators.required,
        CustomValidators.noWhitespace(),
        Validators.minLength(6)
      ]]
    });
  }

  ngOnInit(): void {
    // Focus management and accessibility setup
    setTimeout(() => {
      const firstInput = document.getElementById('email');
      if (firstInput) {
        firstInput.focus();
      }
    }, 100);
  }

  onSubmit(): void {
    // Clear any previous errors
    this.errorSignal.set(null);

    // Always mark form as touched to show validation errors
    this.markFormGroupTouched();

    if (this.loginForm.valid) {
      const credentials: LoginCredentials = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      // DO NOT log credentials including passwords
      // For e2e testing, you may log the email address only (if needed):
      // console.log('Login attempt for email:', credentials.email);

      this.authService.login(credentials).pipe(
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
          // This shouldn't happen with our current implementation
          // but good to have as a fallback
          this.errorSignal.set({
            type: 'server',
            message: 'Error inesperado. Intenta nuevamente.',
            code: 'UNEXPECTED_ERROR'
          });
        }
      });
    }
  }

  // Method to force submit form for testing purposes
  forceSubmit(): void {
    this.onSubmit();
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

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  getFieldError(fieldName: string): string | null {
    const field = this.loginForm.get(fieldName);
    if (field && field.invalid && (field.dirty || field.touched)) {
      const errors = field.errors;
      if (!errors) return null;

      // Priority order for error messages
      if (errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} es requerido`;
      }
      if (errors['whitespace']) {
        return `${this.getFieldDisplayName(fieldName)} no puede estar vacío`;
      }
      if (errors['emailFormat']) {
        return 'Ingresa un correo electrónico válido';
      }
      if (errors['email']) {
        return 'Ingresa un correo electrónico válido';
      }
      if (errors['minlength']) {
        const requiredLength = errors['minlength'].requiredLength;
        return `La contraseña debe tener al menos ${requiredLength} caracteres`;
      }
      if (errors['strongPassword']) {
        return 'La contraseña debe contener mayúsculas, minúsculas, números y caracteres especiales';
      }
    }
    return null;
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: Record<string, string> = {
      email: 'Correo electrónico',
      password: 'Contraseña'
    };
    return displayNames[fieldName] || fieldName;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  clearError(): void {
    this.errorSignal.set(null);
  }

  // Helper method to check if currently loading
  isCurrentlyLoading(): boolean {
    return this.loading().isLoading;
  }

  onForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  onRegister(): void {
    this.router.navigate(['/register']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}