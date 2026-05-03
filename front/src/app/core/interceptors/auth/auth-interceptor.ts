import { HttpInterceptorFn, HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import {Injectable, inject } from '@angular/core'
import {BehaviorSubject, Observable, throwError, catchError, filter, take, switchMap} from 'rxjs'
import { AuthService } from '@app/core/services/auth/auth.service';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({
    withCredentials: true
  });
  return next(authReq);
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);
  private isRefreshing = false;
  private refreshSubject = new BehaviorSubject<boolean>(false);

  // URLs that should never trigger a refresh
  private readonly EXCLUDED_URLS = [
    '/v1/auth/session_tokens/',
    '/v1/auth/logout/',
    '/v1/auth/refresh/',
    '/v1/users/'
  ];

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Never intercept excluded URLs or when logging out
    if (this.isExcluded(req.url) || this.authService.loggingOut) {
      return next.handle(req);
    }

    return next.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401(req, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.isRefreshing) {
      // Wait for the ongoing refresh to complete
      return this.refreshSubject.pipe(
        filter(done => done),
        take(1),
        switchMap(() => next.handle(req))
      );
    }

    this.isRefreshing = true;
    this.refreshSubject.next(false);

    return this.authService.refreshToken().pipe(
      switchMap(() => {
        this.isRefreshing = false;
        this.refreshSubject.next(true);
        return next.handle(req);
      }),
      catchError(err => {
        // Refresh failed — force logout
        this.isRefreshing = false;
        this.authService.logout().subscribe();
        return throwError(() => err);
      })
    );
  }

  private isExcluded(url: string): boolean {
    return this.EXCLUDED_URLS.some(excluded => url.includes(excluded));
  }
}
