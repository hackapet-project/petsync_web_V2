import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

/**
 * API Interceptor - Handles all HTTP requests and responses
 *
 * Features:
 * - Automatically prepends API base URL to relative URLs
 * - Handles authentication tokens (when implemented)
 * - Provides consistent error handling across all API calls
 * - Logs errors in development mode
 */
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // Get API base URL from environment variable
  // In Coolify, set VITE_API_URL environment variable
  // Production: https://api.refupet.org
  // Development: http://localhost:9001/api
  const apiUrl = (window as unknown as { __env?: { apiUrl?: string } }).__env?.apiUrl ||
    (window.location.hostname.includes('refupet.org')
      ? 'https://api.refupet.org'
      : 'http://localhost:9001/api');

  // Clone request and add API base URL if not already an absolute URL
  let modifiedReq = req;
  if (!req.url.startsWith('http')) {
    modifiedReq = req.clone({
      url: `${apiUrl}${req.url.startsWith('/') ? req.url : '/' + req.url}`
    });
  }

  // Future: Add authentication token here
  // const authToken = localStorage.getItem('auth_token');
  // if (authToken) {
  //   modifiedReq = modifiedReq.clone({
  //     setHeaders: { Authorization: `Bearer ${authToken}` }
  //   });
  // }

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Log error in development mode
      if (!window.location.hostname.includes('refupet.org')) {
        console.error('API Error:', {
          status: error.status,
          message: error.message,
          url: error.url,
          error: error.error
        });
      }

      // Transform error to user-friendly message
      let errorMessage = 'Error inesperado. Intenta nuevamente.';

      if (error.status === 0) {
        errorMessage = 'No se puede conectar con el servidor. Verifica tu conexión.';
      } else if (error.status === 400) {
        errorMessage = error.error?.message || 'Datos inválidos.';
      } else if (error.status === 401) {
        errorMessage = 'Sesión expirada. Por favor, inicia sesión nuevamente.';
      } else if (error.status === 403) {
        errorMessage = 'No tienes permisos para realizar esta acción.';
      } else if (error.status === 404) {
        errorMessage = 'Recurso no encontrado.';
      } else if (error.status === 429) {
        errorMessage = 'Demasiados intentos. Intenta nuevamente en unos minutos.';
      } else if (error.status >= 500) {
        errorMessage = 'Error del servidor. Intenta nuevamente más tarde.';
      }

      return throwError(() => ({
        status: error.status,
        message: errorMessage,
        originalError: error
      }));
    })
  );
};
