import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { config, NavItem, UserRole, NavConfig, RoleConfig, WidgetConfig } from './config';

@Injectable({
  providedIn: 'root'
})
export class Nav {
  private userRole$ = new BehaviorSubject<UserRole>('moderator');
  private titleSubject = new BehaviorSubject<string>('Inicio');

  public title$ = this.titleSubject.asObservable();

  private widgetsSubject = new BehaviorSubject<WidgetConfig[]>([]);
  public widgets$ = this.widgetsSubject.asObservable();

  private navigationConfig: NavConfig = config

  setUserRole(role: UserRole) {
    this.userRole$.next(role);
    const roleConfig = config[role];
    if (roleConfig) {
      this.widgetsSubject.next(roleConfig.widgets);
    }
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

  getWidgets(role: UserRole): WidgetConfig[] {
    return config[role]?.widgets || [];
  }

  getWidgetsForRoute(route: string): WidgetConfig[] {
    const roleConfig = config[this.userRole$.value];
    
    if (!roleConfig) { return []; }
    
    // Find if this route should show widgets
    const navItem = roleConfig.navigation.find(item => item.route === route);
    
    // For now, show widgets on the dashboard/home route
    // You can expand this logic to show different widgets per route
    if (route === '/dashboard' || route === '/shelters' || route === '/') {
      return roleConfig.widgets;
    }
    
    return [];
  }

  getCurrentWidgets(): WidgetConfig[] {
    const role = this.userRole$.value;
    return this.getWidgets(role);
  }
}
