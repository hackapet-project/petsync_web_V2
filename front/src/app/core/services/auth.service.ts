import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorHandlerService, LoginError } from './error-handler.service';
import { LoadingService } from './loading.service';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
  error?: LoginError;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly errorHandler = inject(ErrorHandlerService);
  private readonly loadingService = inject(LoadingService);

  private readonly userSignal = signal<User | null>(null);
  private readonly isAuthenticatedSignal = signal<boolean>(false);

  readonly user = this.userSignal.asReadonly();
  readonly isAuthenticated = this.isAuthenticatedSignal.asReadonly();

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    this.loadingService.startLoading('Iniciando sesión...');

    // Simulate API call with various outcomes
    return new Observable<AuthResponse>(observer => {
      setTimeout(() => {
        try {
          // Simulate different scenarios based on email for demo
          if (credentials.email === 'error@test.com') {
            throw new Error('Network error');
          }

          if (credentials.email === 'invalid@test.com') {
            throw { status: 401, message: 'Invalid credentials' };
          }

          if (credentials.email === 'validation@test.com') {
            throw { status: 400, message: 'Validation failed' };
          }

          // Success case
          const user: User = {
            id: '1',
            email: credentials.email,
            name: 'Usuario Test'
          };

          this.userSignal.set(user);
          this.isAuthenticatedSignal.set(true);
          this.loadingService.stopLoading();

          observer.next({
            success: true,
            token: 'fake-jwt-token',
            user
          });
          observer.complete();

        } catch (error) {
          const loginError = this.errorHandler.handleLoginError(error);
          this.loadingService.stopLoading();

          observer.next({
            success: false,
            error: loginError
          });
          observer.complete();
        }
      }, 2000);
    });
  }

  loginWithGoogle(): Observable<AuthResponse> {
    this.loadingService.startLoading('Autenticando con Google...');

    return new Observable<AuthResponse>(observer => {
      setTimeout(() => {
        try {
          // Simulate successful Google OAuth
          const user: User = {
            id: '2',
            email: 'user@gmail.com',
            name: 'Usuario Google'
          };

          this.userSignal.set(user);
          this.isAuthenticatedSignal.set(true);
          this.loadingService.stopLoading();

          observer.next({
            success: true,
            token: 'fake-google-jwt-token',
            user
          });
          observer.complete();

        } catch (error) {
          const loginError = this.errorHandler.handleGoogleAuthError(error);
          this.loadingService.stopLoading();

          observer.next({
            success: false,
            error: loginError
          });
          observer.complete();
        }
      }, 1500);
    });
  }

  logout(): void {
    this.userSignal.set(null);
    this.isAuthenticatedSignal.set(false);
    // TODO: Clear tokens, redirect to login
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSignal();
  }

  getCurrentUser(): User | null {
    return this.userSignal();
  }
}
