import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { config, NavItem, UserRole, NavConfig, RoleConfig } from './config';

@Injectable({
  providedIn: 'root'
})
export class Nav {
  private userRole$ = new BehaviorSubject<UserRole>('moderator');
  private titleSubject = new BehaviorSubject<string>('Inicio');
  public title$ = this.titleSubject.asObservable();
  private navigationConfig: NavConfig = config

  setUserRole(role: UserRole) {
    this.userRole$.next(role);
  }

  setTitle(title: string) {
    this.titleSubject.next(title)
  }

  getNavigationItems(): Observable<NavItem[]> {
    return new Observable<NavItem[]>(observer => {
      this.userRole$.subscribe((role: UserRole) => {
        const items: NavItem[] = this.navigationConfig[role]['navigation'];
        observer.next(items);
      });
    });
  }
}
