import { AfterViewInit, ApplicationRef, Component, ComponentRef, inject, OnDestroy, OnInit, output, signal, ViewChild, ViewContainerRef } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { Nav as NavService } from '../../../core/services/nav/nav';
import { Widget } from '../../../core/services/widget/widget';
import { Nav } from '../../../components/nav/nav';
// import { Dashboard as Dash } from '../../../components/dashboard/dashboard';
import { CommonModule } from '@angular/common';
import { WidgetConfig } from '../../../core/services/nav/config';
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
export class Dashboard implements AfterViewInit, OnDestroy {
  @ViewChild('widgetContainer', { read: ViewContainerRef, static: false })
  widgetContainer!: ViewContainerRef;

  public pageTitle = signal('Inicio');

  private navService = inject(NavService);
  private widgetService = inject(Widget);

  // private appRef = inject(ApplicationRef);
  private componentRefs: ComponentRef<any>[] = [];
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

  ngAfterViewInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.loadWidgetsForCurrentRoute();
    });
    
  //   // Load widgets for initial route
    this.loadWidgetsForCurrentRoute();
  }

  ngOnDestroy(): void {
    this.clearWidgets();
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

  private loadWidgetsForCurrentRoute(): void {
    const currentRoute = this.router.url.split('?')[0]; // Remove query params
    const widgets = this.navService.getWidgetsForRoute(currentRoute);
    this.loadWidgets(widgets);
  }

  private loadWidgets(widgetConfigs: WidgetConfig[]): void {
    // Clear existing widgets
    this.clearWidgets();

    // Sort widgets by position if specified
    const sortedWidgets = [...widgetConfigs].sort((a, b) =>
      (a.position || 0) - (b.position || 0)
    );
    
    // Load each widget dynamically
    sortedWidgets.forEach(widgetConfig => {
      const widgetType = this.widgetService.getWidget(widgetConfig.component);
      if (widgetType) {
        const componentRef = this.widgetContainer.createComponent(widgetType);
        // Pass configuration to widget if available
        if (widgetConfig.config && componentRef.instance.config) {
          componentRef.instance.config = widgetConfig.config;
        }

        this.componentRefs.push(componentRef);
      }
    });
  }

  private clearWidgets(): void {
    this.componentRefs.forEach(ref => ref.destroy());
    this.componentRefs = [];
    // if (this.widgetContainer) {
    //   this.widgetContainer.clear();
    // }
  }
}
