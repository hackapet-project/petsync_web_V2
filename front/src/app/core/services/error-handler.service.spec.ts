import { TestBed } from '@angular/core/testing';
import { ErrorHandlerService } from './error-handler.service';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('handleLoginError', () => {
    it('should handle network errors', () => {
      const networkError = new Error('network error');
      networkError.name = 'NetworkError';

      const result = service.handleLoginError(networkError);

      expect(result.type).toBe('network');
      expect(result.message).toContain('conexión');
      expect(result.code).toBe('NETWORK_ERROR');
    });

    it('should handle authentication errors', () => {
      const authError = { status: 401, message: 'Unauthorized' };

      const result = service.handleLoginError(authError);

      expect(result.type).toBe('authentication');
      expect(result.message).toContain('Credenciales incorrectas');
      expect(result.code).toBe('AUTH_ERROR');
    });

    it('should handle validation errors', () => {
      const validationError = { status: 400, message: 'Validation failed' };

      const result = service.handleLoginError(validationError);

      expect(result.type).toBe('validation');
      expect(result.message).toContain('datos ingresados no son válidos');
      expect(result.code).toBe('VALIDATION_ERROR');
    });

    it('should handle unknown errors as server errors', () => {
      const unknownError = { message: 'Something went wrong' };

      const result = service.handleLoginError(unknownError);

      expect(result.type).toBe('server');
      expect(result.message).toContain('Error interno del servidor');
      expect(result.code).toBe('SERVER_ERROR');
    });
  });

  describe('handleGoogleAuthError', () => {
    it('should handle Google network errors', () => {
      const networkError = new Error('network error');
      networkError.name = 'NetworkError';

      const result = service.handleGoogleAuthError(networkError);

      expect(result.type).toBe('network');
      expect(result.message).toContain('Google');
      expect(result.code).toBe('GOOGLE_NETWORK_ERROR');
    });

    it('should handle general Google auth errors', () => {
      const authError = { message: 'OAuth failed' };

      const result = service.handleGoogleAuthError(authError);

      expect(result.type).toBe('authentication');
      expect(result.message).toContain('Google');
      expect(result.code).toBe('GOOGLE_AUTH_ERROR');
    });
  });
});