import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test.describe('Page Layout and Elements', () => {
    test('should display login page with correct title', async ({ page }) => {
      await expect(page).toHaveTitle(/PetSync - Gestión profesional para refugios/);
    });

    test('should display left panel with logo and description', async ({ page }) => {
      const leftPanel = page.locator('.left-panel');
      await expect(leftPanel).toBeVisible();

      const logo = page.locator('.logo');
      await expect(logo).toBeVisible();
      await expect(logo).toHaveAttribute('alt', 'Hackapet Logo');

      const appTitle = page.locator('.app-title');
      await expect(appTitle).toBeVisible();
      await expect(appTitle).toHaveText('PetSync');

      const description = page.locator('.description h2');
      await expect(description).toBeVisible();
      await expect(description).toHaveText('Gestión profesional para refugios de animales');
    });

    test('should display login form with all fields', async ({ page }) => {
      const formHeader = page.locator('.form-header h1');
      await expect(formHeader).toBeVisible();
      await expect(formHeader).toHaveText('Iniciar sesión');

      const emailInput = page.locator('#email');
      await expect(emailInput).toBeVisible();
      await expect(emailInput).toHaveAttribute('type', 'email');
      await expect(emailInput).toHaveAttribute('placeholder', 'tu@ejemplo.com');

      const passwordInput = page.locator('#password');
      await expect(passwordInput).toBeVisible();
      await expect(passwordInput).toHaveAttribute('type', 'password');
      await expect(passwordInput).toHaveAttribute('placeholder', 'Tu contraseña');

      const loginButton = page.locator('.login-button');
      await expect(loginButton).toBeVisible();
      await expect(loginButton).toHaveText('Iniciar sesión');

      const googleButton = page.locator('.oauth-button.google');
      await expect(googleButton).toBeVisible();
      await expect(googleButton).toContainText('Continuar con Google');
    });

    test('should display forgot password and signup links', async ({ page }) => {
      const forgotLink = page.locator('.forgot-link');
      await expect(forgotLink).toBeVisible();
      await expect(forgotLink).toHaveText('¿Olvidaste tu contraseña?');

      const signupText = page.locator('.signup-text');
      await expect(signupText).toBeVisible();
      await expect(signupText).toHaveText('Conoce más aquí');
    });
  });

  test.describe('Form Validation', () => {
    test('should show validation errors for empty form', async ({ page }) => {
      const loginButton = page.locator('.login-button');
      await expect(loginButton).toBeDisabled();

      await loginButton.click();

      // Check if validation errors appear
      const emailInput = page.locator('#email');
      await emailInput.focus();
      await emailInput.blur();

      const passwordInput = page.locator('#password');
      await passwordInput.focus();
      await passwordInput.blur();

      const errorMessages = page.locator('.error-message');
      await expect(errorMessages).toHaveCount(2);
    });

    test('should show email validation error for invalid email', async ({ page }) => {
      const emailInput = page.locator('#email');
      await emailInput.fill('invalid-email');
      await emailInput.blur();

      const errorMessage = page.locator('.error-message').first();
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toHaveText('Ingresa un correo electrónico válido');
    });

    test('should show password validation error for short password', async ({ page }) => {
      const passwordInput = page.locator('#password');
      await passwordInput.fill('123');
      await passwordInput.blur();

      const errorMessages = page.locator('.error-message');
      const passwordError = errorMessages.filter({ hasText: 'La contraseña debe tener al menos 6 caracteres' });
      await expect(passwordError).toBeVisible();
    });

    test('should enable submit button when form is valid', async ({ page }) => {
      const emailInput = page.locator('#email');
      await emailInput.fill('test@example.com');

      const passwordInput = page.locator('#password');
      await passwordInput.fill('password123');

      const loginButton = page.locator('.login-button');
      await expect(loginButton).toBeEnabled();
    });
  });

  test.describe('Form Interactions', () => {
    test('should toggle password visibility', async ({ page }) => {
      const passwordInput = page.locator('#password');
      const toggleButton = page.locator('.password-toggle');

      await expect(passwordInput).toHaveAttribute('type', 'password');

      await toggleButton.click();
      await expect(passwordInput).toHaveAttribute('type', 'text');

      await toggleButton.click();
      await expect(passwordInput).toHaveAttribute('type', 'password');
    });

    test('should show loading state when submitting valid form', async ({ page }) => {
      const emailInput = page.locator('#email');
      await emailInput.fill('test@example.com');

      const passwordInput = page.locator('#password');
      await passwordInput.fill('password123');

      const loginButton = page.locator('.login-button');
      await loginButton.click();

      // Check for loading state
      await expect(loginButton).toContainText('Iniciando sesión...');
      await expect(loginButton).toBeDisabled();

      const spinner = page.locator('.spinner');
      await expect(spinner).toBeVisible();
    });

    test('should show loading state when clicking Google OAuth', async ({ page }) => {
      const googleButton = page.locator('.oauth-button.google');
      await googleButton.click();

      // Check if loading state is applied
      await expect(googleButton).toBeDisabled();
    });
  });

  test.describe('Responsive Design', () => {
    test('should display correctly on mobile devices', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const loginContainer = page.locator('.login-container');
      await expect(loginContainer).toBeVisible();

      const leftPanel = page.locator('.left-panel');
      await expect(leftPanel).toBeVisible();

      const rightPanel = page.locator('.right-panel');
      await expect(rightPanel).toBeVisible();

      const formContainer = page.locator('.form-container');
      await expect(formContainer).toBeVisible();
    });

    test('should maintain functionality on tablet devices', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      const emailInput = page.locator('#email');
      await emailInput.fill('test@example.com');

      const passwordInput = page.locator('#password');
      await passwordInput.fill('password123');

      const loginButton = page.locator('.login-button');
      await expect(loginButton).toBeEnabled();
      await loginButton.click();

      await expect(loginButton).toContainText('Iniciando sesión...');
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper form labels', async ({ page }) => {
      const emailLabel = page.locator('label[for="email"]');
      await expect(emailLabel).toBeVisible();
      await expect(emailLabel).toHaveText('Correo electrónico');

      const passwordLabel = page.locator('label[for="password"]');
      await expect(passwordLabel).toBeVisible();
      await expect(passwordLabel).toHaveText('Contraseña');
    });

    test('should have proper aria attributes', async ({ page }) => {
      const passwordToggle = page.locator('.password-toggle');
      await expect(passwordToggle).toHaveAttribute('aria-label', 'Mostrar contraseña');

      await passwordToggle.click();
      await expect(passwordToggle).toHaveAttribute('aria-label', 'Ocultar contraseña');
    });

    test('should have proper autocomplete attributes', async ({ page }) => {
      const emailInput = page.locator('#email');
      await expect(emailInput).toHaveAttribute('autocomplete', 'email');

      const passwordInput = page.locator('#password');
      await expect(passwordInput).toHaveAttribute('autocomplete', 'current-password');
    });

    test('should be keyboard navigable', async ({ page }) => {
      // Tab through form elements
      await page.keyboard.press('Tab');
      await expect(page.locator('#email')).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.locator('#password')).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.locator('.password-toggle')).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.locator('.forgot-link')).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.locator('.login-button')).toBeFocused();
    });
  });

  test.describe('Form Submission', () => {
    test('should prevent submission of invalid form', async ({ page }) => {
      const loginButton = page.locator('.login-button');

      // Try to submit empty form
      await expect(loginButton).toBeDisabled();

      // Fill with invalid data
      await page.locator('#email').fill('invalid-email');
      await page.locator('#password').fill('123');

      await expect(loginButton).toBeDisabled();
    });

    test('should handle form submission with valid data', async ({ page }) => {
      // Listen for console logs
      const consoleLogs: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'log') {
          consoleLogs.push(msg.text());
        }
      });

      const emailInput = page.locator('#email');
      await emailInput.fill('test@example.com');

      const passwordInput = page.locator('#password');
      await passwordInput.fill('password123');

      const loginButton = page.locator('.login-button');
      await expect(loginButton).toBeEnabled();

      await loginButton.click();

      // Wait for the form submission to complete
      await page.waitForTimeout(2500);

      // Check if console log contains expected messages
      expect(consoleLogs).toContain('Login attempt: {"email":"test@example.com","password":"password123"}');
      expect(consoleLogs).toContain('Login successful');
    });

    test('should handle Google OAuth button click', async ({ page }) => {
      // Listen for console logs
      const consoleLogs: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'log') {
          consoleLogs.push(msg.text());
        }
      });

      const googleButton = page.locator('.oauth-button.google');
      await googleButton.click();

      // Wait for the OAuth simulation to complete
      await page.waitForTimeout(2000);

      // Check if console log contains expected messages
      expect(consoleLogs).toContain('Google OAuth login initiated');
      expect(consoleLogs).toContain('Google login successful');
    });
  });

  test.describe('Error Handling', () => {
    test('should display error styling for invalid inputs', async ({ page }) => {
      const emailInput = page.locator('#email');
      await emailInput.fill('invalid-email');
      await emailInput.blur();

      await expect(emailInput).toHaveClass(/error/);
    });

    test('should clear errors when input becomes valid', async ({ page }) => {
      const emailInput = page.locator('#email');

      // First make it invalid
      await emailInput.fill('invalid-email');
      await emailInput.blur();
      await expect(emailInput).toHaveClass(/error/);

      // Then make it valid
      await emailInput.fill('test@example.com');
      await emailInput.blur();
      await expect(emailInput).not.toHaveClass(/error/);
    });
  });
});