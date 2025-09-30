import { Component, OnInit, signal, ChangeDetectionStrategy, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CustomValidators } from '../../core/validators/custom-validators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Register implements OnInit, OnDestroy {
  registerForm: FormGroup;
  isPasswordVisible = false;
  isConfirmPasswordVisible = false;

  private readonly destroy$ = new Subject<void>();
  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly isLoading = this.loadingSignal.asReadonly();

  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);

  constructor() {
    this.registerForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        CustomValidators.noWhitespace(),
        Validators.minLength(2)
      ]],
      email: ['', [
        Validators.required,
        CustomValidators.noWhitespace(),
        CustomValidators.emailFormat()
      ]],
      password: ['', [
        Validators.required,
        CustomValidators.noWhitespace(),
        Validators.minLength(8),
        this.passwordStrengthValidator()
      ]],
      confirmPassword: ['', [
        Validators.required,
        CustomValidators.noWhitespace()
      ]],
      acceptTerms: [false, [Validators.requiredTrue]]
    }, {
      validators: this.passwordMatchValidator()
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      const nameInput = document.getElementById('name');
      if (nameInput) {
        nameInput.focus();
      }
    }, 100);
  }

  /**
   * Custom validator to ensure password meets strength requirements
   * Requires: 8+ characters, uppercase, lowercase, and number
   */
  private passwordStrengthValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      const isValidLength = value.length >= 8;

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && isValidLength;

      return !passwordValid ? { passwordStrength: true } : null;
    };
  }

  /**
   * Custom form validator to ensure passwords match
   */
  private passwordMatchValidator() {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;

      if (!password || !confirmPassword) {
        return null;
      }

      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }

  onSubmit(): void {
    this.errorSignal.set(null);
    this.markFormGroupTouched();

    if (this.registerForm.valid) {
      this.loadingSignal.set(true);
      const formData = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
        // NOTE: Never send confirmPassword to backend
        // NOTE: Never send acceptTerms to backend (it's client-side only)
      };

      // Simulate API call
      setTimeout(() => {
        this.loadingSignal.set(false);
        console.log('Registration successful for:', formData.email);
        // TODO: Navigate to login or dashboard
      }, 1500);
    }
  }

  onBackToLogin(): void {
    this.router.navigate(['/login']);
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleConfirmPasswordVisibility(): void {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }

  getFieldError(fieldName: string): string | null {
    const field = this.registerForm.get(fieldName);

    // Check for form-level errors (like password mismatch)
    if (fieldName === 'confirmPassword' && this.registerForm.errors?.['passwordMismatch']) {
      if (field && (field.dirty || field.touched)) {
        return 'Las contraseñas no coinciden';
      }
    }

    if (field && field.invalid && (field.dirty || field.touched)) {
      const errors = field.errors;
      if (!errors) return null;

      if (errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} es requerido`;
      }
      if (errors['whitespace']) {
        return `${this.getFieldDisplayName(fieldName)} no puede estar vacío`;
      }
      if (errors['emailFormat'] || errors['email']) {
        return 'Ingresa un correo electrónico válido';
      }
      if (errors['minlength']) {
        const requiredLength = errors['minlength'].requiredLength;
        return `Debe tener al menos ${requiredLength} caracteres`;
      }
      if (errors['passwordStrength']) {
        return 'Debe incluir mayúsculas, minúsculas y números';
      }
      if (errors['requiredTrue']) {
        return 'Debes aceptar los términos y condiciones';
      }
    }
    return null;
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: Record<string, string> = {
      name: 'Nombre',
      email: 'Correo electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmación de contraseña',
      acceptTerms: 'Aceptación de términos'
    };
    return displayNames[fieldName] || fieldName;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  clearError(): void {
    this.errorSignal.set(null);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}