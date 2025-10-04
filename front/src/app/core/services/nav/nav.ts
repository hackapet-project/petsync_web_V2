import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { config, NavItem, UserRole, NavConfig } from './config';

@Injectable({
  providedIn: 'root'
})
export class Nav {
  private userRole$ = new BehaviorSubject<UserRole>('moderator');
  private navigationConfig: NavConfig = config

  setUserRole(role: UserRole) {
    this.userRole$.next(role);
  }

  getNavigationItems(): Observable<NavItem[]> {
    return new Observable<NavItem[]>(observer => {
      this.userRole$.subscribe((role: UserRole) => {
        const items = this.navigationConfig[role];
        observer.next(items);
      });
    });
  }
}
