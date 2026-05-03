import { Component, inject, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { Nav as NavService } from '../../../core/services/nav/nav';
import { Nav } from '../../../components/nav/nav';
import { CommonModule } from '@angular/common';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    // MatIcon,
    Nav,
    // Dash,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnDestroy {
  public pageTitle = signal('Inicio');

  private navService = inject(NavService);
  private destroy$ = new Subject<void>();
  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute);

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  constructor() {

    this.navService.title$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(title => {
      this.pageTitle.set(title);
    });

    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    )
    .subscribe(() => {
      // Get title from route data
      const title = this.getRouteTitle(this.activatedRoute);
      if (title) {
        this.navService.setTitle(title);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getRouteTitle(route: ActivatedRoute): string | null {
    // Check if current route has title in data
    if (route.snapshot.data['title']) {
      return route.snapshot.data['title'];
    }
    
    // Check child routes
    if (route.firstChild) {
      return this.getRouteTitle(route.firstChild);
    }
    
    return null;
  }

}
