import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { signal } from '@angular/core';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthService } from '../../core/services/auth.service';
import { LoadingService, LoadingState } from '../../core/services/loading.service';

// Mock services
class MockAuthService {
  login = jasmine.createSpy('login').and.returnValue(of({ success: true }));
  loginWithGoogle = jasmine.createSpy('loginWithGoogle').and.returnValue(of({ success: true }));
}

class MockLoadingService {
  loadingState = signal<LoadingState>({ isLoading: false });
  loading = this.loadingState.asReadonly();
  startLoading = jasmine.createSpy('startLoading');
  stopLoading = jasmine.createSpy('stopLoading');
  isCurrentlyLoading = jasmine.createSpy('isCurrentlyLoading').and.returnValue(false);
  updateProgress = jasmine.createSpy('updateProgress');
  getCurrentOperation = jasmine.createSpy('getCurrentOperation');
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: LoadingService, useClass: MockLoadingService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with default values', () => {
      expect(component.isPasswordVisible).toBe(false);
      expect(component.isCurrentlyLoading()).toBe(false);
      expect(component.loginForm).toBeDefined();
    });

    it('should initialize form with empty values', () => {
      expect(component.loginForm.get('email')?.value).toBe('');
      expect(component.loginForm.get('password')?.value).toBe('');
    });

    it('should have form controls with proper validators', () => {
      const emailControl = component.loginForm.get('email');
      const passwordControl = component.loginForm.get('password');

      expect(emailControl?.hasError('required')).toBe(true);
      expect(passwordControl?.hasError('required')).toBe(true);

      emailControl?.setValue('invalid-email');
      expect(emailControl?.hasError('email')).toBe(true);

      passwordControl?.setValue('12345');
      expect(passwordControl?.hasError('minlength')).toBe(true);
    });
  });

  describe('Form Validation', () => {
    it('should show email required error', () => {
      const emailControl = component.loginForm.get('email');
      emailControl?.markAsTouched();
      fixture.detectChanges();

      expect(component.getFieldError('email')).toBe('Correo electrónico es requerido');
    });

    it('should show email format error', () => {
      const emailControl = component.loginForm.get('email');
      emailControl?.setValue('invalid-email');
      emailControl?.markAsTouched();
      fixture.detectChanges();

      expect(component.getFieldError('email')).toBe('Ingresa un correo electrónico válido');
    });

    it('should show password required error', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.markAsTouched();
      fixture.detectChanges();

      expect(component.getFieldError('password')).toBe('Contraseña es requerido');
    });

    it('should show password minimum length error', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.setValue('12345');
      passwordControl?.markAsTouched();
      fixture.detectChanges();

      expect(component.getFieldError('password')).toBe('La contraseña debe tener al menos 6 caracteres');
    });

    it('should return null for valid fields', () => {
      const emailControl = component.loginForm.get('email');
      emailControl?.setValue('test@example.com');
      emailControl?.markAsTouched();

      expect(component.getFieldError('email')).toBeNull();
    });
  });

  describe('Password Visibility Toggle', () => {
    it('should toggle password visibility', () => {
      expect(component.isPasswordVisible).toBe(false);

      component.togglePasswordVisibility();
      expect(component.isPasswordVisible).toBe(true);

      component.togglePasswordVisibility();
      expect(component.isPasswordVisible).toBe(false);
    });

    it('should change password input type when toggled', () => {
      const passwordInput = compiled.querySelector('#password') as HTMLInputElement;
      expect(passwordInput.type).toBe('password');

      component.togglePasswordVisibility();
      fixture.detectChanges();
      expect(passwordInput.type).toBe('text');

      component.togglePasswordVisibility();
      fixture.detectChanges();
      expect(passwordInput.type).toBe('password');
    });
  });

  describe('Form Submission', () => {
    it('should not submit invalid form', () => {
      component.onSubmit();
      expect(component.isCurrentlyLoading()).toBe(false);
    });

    it('should mark all fields as touched when form is invalid', () => {
      component.onSubmit();

      expect(component.loginForm.get('email')?.touched).toBe(true);
      expect(component.loginForm.get('password')?.touched).toBe(true);
    });

    it('should submit valid form', () => {
      const authService = TestBed.inject(AuthService);

      component.loginForm.patchValue({
        email: 'test@example.com',
        password: 'password123'
      });

      component.onSubmit();

      expect(authService.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });

    it('should disable submit button when form is invalid', () => {
      const submitButton = compiled.querySelector('.login-button') as HTMLButtonElement;
      expect(submitButton.disabled).toBe(true);
    });

    it('should enable submit button when form is valid', () => {
      component.loginForm.patchValue({
        email: 'test@example.com',
        password: 'password123'
      });
      fixture.detectChanges();

      const submitButton = compiled.querySelector('.login-button') as HTMLButtonElement;
      expect(submitButton.disabled).toBe(false);
    });

    it('should disable submit button when loading', () => {
      const loadingService = TestBed.inject(LoadingService) as MockLoadingService;
      loadingService.loadingState.set({ isLoading: true, operation: 'Loading...' });
      loadingService.isCurrentlyLoading = jasmine.createSpy('isCurrentlyLoading').and.returnValue(true);

      component.loginForm.patchValue({
        email: 'test@example.com',
        password: 'password123'
      });
      fixture.detectChanges();

      const submitButton = compiled.querySelector('.login-button') as HTMLButtonElement;
      expect(submitButton.disabled).toBe(true);
    });
  });

  describe('OAuth Login', () => {
    it('should handle Google login', () => {
      const authService = TestBed.inject(AuthService);

      component.onGoogleLogin();

      expect(authService.loginWithGoogle).toHaveBeenCalled();
    });

    it('should disable OAuth buttons when loading', () => {
      const loadingService = TestBed.inject(LoadingService) as MockLoadingService;
      loadingService.loadingState.set({ isLoading: true, operation: 'Loading...' });
      loadingService.isCurrentlyLoading = jasmine.createSpy('isCurrentlyLoading').and.returnValue(true);

      // Create a new component instance to reflect the loading state
      component = fixture.componentInstance;
      fixture.detectChanges();

      const googleButton = compiled.querySelector('.oauth-button.google') as HTMLButtonElement;
      expect(googleButton.disabled).toBe(true);
    });
  });

  describe('UI Elements', () => {
    it('should display app title and description', () => {
      const title = compiled.querySelector('.app-title');
      const description = compiled.querySelector('.description h2');

      expect(title?.textContent?.trim()).toBe('PetSync');
      expect(description?.textContent?.trim()).toBe('Gestión profesional para refugios de animales');
    });

    it('should display form header', () => {
      const header = compiled.querySelector('.form-header h1');
      const subtitle = compiled.querySelector('.form-header p');

      expect(header?.textContent?.trim()).toBe('Iniciar sesión');
      expect(subtitle?.textContent?.trim()).toBe('Accede a tu cuenta para gestionar el refugio');
    });

    it('should display email input with placeholder', () => {
      const emailInput = compiled.querySelector('#email') as HTMLInputElement;
      expect(emailInput.placeholder).toBe('tu@ejemplo.com');
      expect(emailInput.type).toBe('email');
    });

    it('should display password input with placeholder', () => {
      const passwordInput = compiled.querySelector('#password') as HTMLInputElement;
      expect(passwordInput.placeholder).toBe('Tu contraseña');
    });

    it('should display forgot password link', () => {
      const forgotLink = compiled.querySelector('.forgot-link');
      expect(forgotLink?.textContent?.trim()).toBe('¿Olvidaste tu contraseña?');
    });

    it('should display signup link', () => {
      const signupText = compiled.querySelector('.signup-text');
      expect(signupText?.textContent?.trim()).toBe('Conoce más aquí');
    });

    it('should display OAuth buttons', () => {
      const googleButton = compiled.querySelector('.oauth-button.google');
      expect(googleButton?.textContent?.trim()).toContain('Continuar con Google');
    });

    it('should show loading state', () => {
      const loadingService = TestBed.inject(LoadingService) as MockLoadingService;
      loadingService.loadingState.set({ isLoading: true, operation: 'Iniciando sesión...' });

      component = fixture.componentInstance;
      fixture.detectChanges();

      const submitButton = compiled.querySelector('.login-button');
      expect(submitButton?.textContent?.trim()).toContain('Iniciando sesión...');

      const spinner = compiled.querySelector('.spinner');
      expect(spinner).toBeTruthy();
    });
  });

  describe('User Interactions', () => {
    it('should call onSubmit when form is submitted', () => {
      spyOn(component, 'onSubmit');
      const form = compiled.querySelector('.login-form') as HTMLFormElement;

      form.dispatchEvent(new Event('submit'));
      expect(component.onSubmit).toHaveBeenCalled();
    });

    it('should call togglePasswordVisibility when password toggle is clicked', () => {
      spyOn(component, 'togglePasswordVisibility');
      const toggleButton = compiled.querySelector('.password-toggle') as HTMLButtonElement;

      toggleButton.click();
      expect(component.togglePasswordVisibility).toHaveBeenCalled();
    });

    it('should call onGoogleLogin when Google button is clicked', () => {
      spyOn(component, 'onGoogleLogin');
      const googleButton = compiled.querySelector('.oauth-button.google') as HTMLButtonElement;

      googleButton.click();
      expect(component.onGoogleLogin).toHaveBeenCalled();
    });


    it('should update form values when user types', () => {
      const emailInput = compiled.querySelector('#email') as HTMLInputElement;
      const passwordInput = compiled.querySelector('#password') as HTMLInputElement;

      emailInput.value = 'test@example.com';
      emailInput.dispatchEvent(new Event('input'));
      passwordInput.value = 'password123';
      passwordInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.loginForm.get('email')?.value).toBe('test@example.com');
      expect(component.loginForm.get('password')?.value).toBe('password123');
    });
  });

  describe('Error Display', () => {
    it('should display email error in template', () => {
      const emailControl = component.loginForm.get('email');
      emailControl?.setValue('invalid-email');
      emailControl?.markAsTouched();
      fixture.detectChanges();

      const errorMessage = compiled.querySelector('.error-message');
      expect(errorMessage?.textContent?.trim()).toBe('Ingresa un correo electrónico válido');
    });

    it('should display password error in template', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.setValue('123');
      passwordControl?.markAsTouched();
      fixture.detectChanges();

      const errorMessages = compiled.querySelectorAll('.error-message');
      const passwordError = Array.from(errorMessages).find(el =>
        el.textContent?.includes('La contraseña debe tener al menos 6 caracteres')
      );
      expect(passwordError).toBeTruthy();
    });

    it('should apply error class to invalid inputs', () => {
      const emailControl = component.loginForm.get('email');
      emailControl?.setValue('invalid-email');
      emailControl?.markAsTouched();
      fixture.detectChanges();

      const emailInput = compiled.querySelector('#email') as HTMLInputElement;
      expect(emailInput.classList.contains('error')).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should have proper labels for inputs', () => {
      const emailLabel = compiled.querySelector('label[for="email"]');
      const passwordLabel = compiled.querySelector('label[for="password"]');

      expect(emailLabel?.textContent?.trim()).toBe('Correo electrónico');
      expect(passwordLabel?.textContent?.trim()).toBe('Contraseña');
    });

    it('should have aria-label for password toggle button', () => {
      const toggleButton = compiled.querySelector('.password-toggle') as HTMLButtonElement;
      expect(toggleButton.getAttribute('aria-label')).toBe('Mostrar contraseña');

      component.togglePasswordVisibility();
      fixture.detectChanges();
      expect(toggleButton.getAttribute('aria-label')).toBe('Ocultar contraseña');
    });

    it('should have proper autocomplete attributes', () => {
      const emailInput = compiled.querySelector('#email') as HTMLInputElement;
      const passwordInput = compiled.querySelector('#password') as HTMLInputElement;

      expect(emailInput.getAttribute('autocomplete')).toBe('email');
      expect(passwordInput.getAttribute('autocomplete')).toBe('current-password');
    });
  });
});