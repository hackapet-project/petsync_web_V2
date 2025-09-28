import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {

  /**
   * Validator for strong passwords
   * Password must contain at least:
   * - 8 characters
   * - 1 uppercase letter
   * - 1 lowercase letter
   * - 1 number
   * - 1 special character
   */
  static strongPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // Let required validator handle empty values
      }

      const value = control.value;
      const errors: ValidationErrors = {};

      if (value.length < 8) {
        errors['minlength'] = { requiredLength: 8, actualLength: value.length };
      }

      if (!/[A-Z]/.test(value)) {
        errors['uppercase'] = true;
      }

      if (!/[a-z]/.test(value)) {
        errors['lowercase'] = true;
      }

      if (!/[0-9]/.test(value)) {
        errors['number'] = true;
      }

      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        errors['specialChar'] = true;
      }

      return Object.keys(errors).length ? errors : null;
    };
  }

  /**
   * Email domain validator
   * Validates that email belongs to allowed domains
   */
  static allowedEmailDomains(allowedDomains: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const email = control.value.toLowerCase();
      const domain = email.split('@')[1];

      if (!domain || !allowedDomains.includes(domain)) {
        return { 'emailDomain': { allowedDomains, actualDomain: domain } };
      }

      return null;
    };
  }

  /**
   * No whitespace validator
   * Ensures the field doesn't contain only whitespace
   */
  static noWhitespace(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const isWhitespace = (control.value || '').trim().length === 0;
      return isWhitespace ? { 'whitespace': true } : null;
    };
  }

  /**
   * Email format validator with better error messages
   */
  static emailFormat(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(control.value) ? null : { 'emailFormat': true };
    };
  }

  /**
   * Password confirmation validator
   * Must be used on the form group, not individual control
   */
  static passwordMatch(passwordField: string, confirmField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get(passwordField);
      const confirmPassword = control.get(confirmField);

      if (!password || !confirmPassword) {
        return null;
      }

      if (confirmPassword.errors && !confirmPassword.errors['passwordMatch']) {
        return null;
      }

      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMatch: true });
        return { passwordMatch: true };
      } else {
        const errors = confirmPassword.errors;
        if (errors) {
          delete errors['passwordMatch'];
          confirmPassword.setErrors(Object.keys(errors).length ? errors : null);
        }
        return null;
      }
    };
  }
}