import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router'
import { tap, catchError } from 'rxjs/operators';
import { of, Observable, finalize } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService, LoginError } from '../error-handler.service';
import { LoadingService } from '../loading.service';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterUserDto {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  shelter?: string | null;
}

export interface AuthResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
    shelter: string | null;
  },
  error?: LoginError;
}

export interface User {
  id: string;
  email: string;
  name: string;
  shelter: string | null;
}

export interface RegisterResponse {
  user_id: string;
  name: string;
  email: string;
  is_active: boolean;
  created_at: string;
  shelter: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private base = 'http://localhost:9000';
  private isLoggingOut = false;
  private readonly errorHandler = inject(ErrorHandlerService);
  private readonly loadingService = inject(LoadingService);

  private readonly userSignal = signal<User | null>(null);
  private readonly isAuthenticatedSignal = signal<boolean>(false);

  readonly user = this.userSignal.asReadonly();
  readonly isAuthenticated = this.isAuthenticatedSignal.asReadonly();

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    this.loadingService.startLoading('Iniciando sesión...');
    return this.http.post<AuthResponse>(`${this.base}/v1/auth/session_tokens/`, credentials).pipe(
      tap((response: AuthResponse) => {
        this.userSignal.set(response.user ?? null);
        this.isAuthenticatedSignal.set(true);
        this.loadingService.stopLoading();
      }),
      catchError((e: HttpErrorResponse) => {
        const loginError = this.errorHandler.handleLoginError(e);
        this.loadingService.stopLoading();
        return of({ success: false, error: loginError });
      })
    );
  }

  register(payload: RegisterUserDto): Observable<RegisterResponse> {
    this.loadingService.startLoading('Creando usuario...');

    return this.http.post<RegisterResponse>(`${this.base}/v1/users/`, payload).pipe(
      finalize(() => {
        this.loadingService.stopLoading();
      })
    );
  }

  // loginWithGoogle(): Observable<AuthResponse> {
  //   this.loadingService.startLoading('Autenticando con Google...');

  //   return new Observable<AuthResponse>(observer => {
  //     setTimeout(() => {
  //       try {
  //         // Simulate successful Google OAuth
  //         const user: User = {
  //           id: '2',
  //           email: 'user@gmail.com',
  //           name: 'Usuario Google'
  //         };

  //         this.userSignal.set(user);
  //         this.isAuthenticatedSignal.set(true);
  //         this.loadingService.stopLoading();

  //         observer.next({
  //           success: true,
  //           token: 'fake-google-jwt-token',
  //           user
  //         });
  //         observer.complete();

  //       } catch (error) {
  //         const loginError = this.errorHandler.handleGoogleAuthError(error);
  //         this.loadingService.stopLoading();

  //         observer.next({
  //           success: false,
  //           error: loginError
  //         });
  //         observer.complete();
  //       }
  //     }, 1500);
  //   });
  // }

  logout(): Observable<void> {
    this.isLoggingOut = true;

    return this.http.post<void>(`${this.base}/v1/auth/logout/`, {}).pipe(
      finalize(() => {
        this.isLoggingOut = false;
        this.userSignal.set(null);
        this.isAuthenticatedSignal.set(false);
        this.router.navigate(['/login']);
      })
    );
    // TODO: Clear tokens, redirect to login
  }
  
  get loggingOut(): boolean {
    return this.isLoggingOut;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSignal();
  }

  getCurrentUser(): User | null {
    return this.userSignal();
  }

  refreshToken(): Observable<void> {
    return this.http.post<void>(`${this.base}/v1/auth/refresh/`, {});
  }
}
