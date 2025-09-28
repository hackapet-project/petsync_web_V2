import { Injectable } from '@angular/core';

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

export interface LoginError extends ApiError {
  type: 'authentication' | 'validation' | 'network' | 'server';
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  handleLoginError(error: unknown): LoginError {
    if (this.isNetworkError(error)) {
      return {
        type: 'network',
        message: 'Error de conexión. Verifica tu conexión a internet e intenta nuevamente.',
        code: 'NETWORK_ERROR'
      };
    }

    if (this.isValidationError(error)) {
      return {
        type: 'validation',
        message: 'Los datos ingresados no son válidos. Verifica e intenta nuevamente.',
        code: 'VALIDATION_ERROR'
      };
    }

    if (this.isAuthenticationError(error)) {
      return {
        type: 'authentication',
        message: 'Credenciales incorrectas. Verifica tu correo y contraseña.',
        code: 'AUTH_ERROR'
      };
    }

    // Default server error
    return {
      type: 'server',
      message: 'Error interno del servidor. Intenta nuevamente en unos momentos.',
      code: 'SERVER_ERROR',
      details: error
    };
  }

  handleGoogleAuthError(error: unknown): LoginError {
    if (this.isNetworkError(error)) {
      return {
        type: 'network',
        message: 'Error de conexión durante la autenticación con Google.',
        code: 'GOOGLE_NETWORK_ERROR'
      };
    }

    return {
      type: 'authentication',
      message: 'Error en la autenticación con Google. Intenta nuevamente.',
      code: 'GOOGLE_AUTH_ERROR',
      details: error
    };
  }

  private isNetworkError(error: unknown): boolean {
    return error instanceof Error &&
           (error.name === 'NetworkError' ||
            error.message.includes('network') ||
            error.message.includes('fetch'));
  }

  private isValidationError(error: unknown): boolean {
    return typeof error === 'object' &&
           error !== null &&
           'status' in error &&
           (error as { status: number }).status === 400;
  }

  private isAuthenticationError(error: unknown): boolean {
    return typeof error === 'object' &&
           error !== null &&
           'status' in error &&
           (error as { status: number }).status === 401;
  }
}