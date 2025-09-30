import { Component, OnInit, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CustomValidators } from '../../core/validators/custom-validators';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly isLoading = this.loadingSignal.asReadonly();

  private readonly emailSentSignal = signal<boolean>(false);
  readonly emailSent = this.emailSentSignal.asReadonly();

  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);

  constructor() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        CustomValidators.noWhitespace(),
        CustomValidators.emailFormat()
      ]]
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      const emailInput = document.getElementById('email');
      if (emailInput) {
        emailInput.focus();
      }
    }, 100);
  }

  onSubmit(): void {
    this.errorSignal.set(null);
    this.markFormGroupTouched();

    if (this.forgotPasswordForm.valid) {
      this.loadingSignal.set(true);
      // const email = this.forgotPasswordForm.value.email;

      // Simulate API call
      setTimeout(() => {
        this.loadingSignal.set(false);
        this.emailSentSignal.set(true);
        // TODO: Implement actual API call to backend with email
      }, 1500);
    }
  }

  onBackToLogin(): void {
    this.router.navigate(['/login']);
  }

  getFieldError(fieldName: string): string | null {
    const field = this.forgotPasswordForm.get(fieldName);
    if (field && field.invalid && (field.dirty || field.touched)) {
      const errors = field.errors;
      if (!errors) return null;

      if (errors['required']) {
        return 'Correo electrónico es requerido';
      }
      if (errors['whitespace']) {
        return 'Correo electrónico no puede estar vacío';
      }
      if (errors['emailFormat'] || errors['email']) {
        return 'Ingresa un correo electrónico válido';
      }
    }
    return null;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.forgotPasswordForm.controls).forEach(key => {
      const control = this.forgotPasswordForm.get(key);
      control?.markAsTouched();
    });
  }

  clearError(): void {
    this.errorSignal.set(null);
  }
}