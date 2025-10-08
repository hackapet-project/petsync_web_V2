import { Component, ComponentRef, inject, OnInit, output, signal, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Nav as NavService } from '../../core/services/nav/nav';
import { Animal, animals } from '../../core/utils/animal_mocks';
import { CommonModule } from '@angular/common';
import { AnimalList } from '../widgets/animal-list/animal-list';
import { WidgetConfig } from '../../core/services/nav/config';
import { Widget } from '../../core/services/widget/widget';

@Component({
  selector: 'app-dash',
  imports: [
    RouterModule,
    CommonModule,
    AnimalList
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  // @ViewChild('widgetContainer', { read: ViewContainerRef, static: false })
  // widgetContainer!: ViewContainerRef;

  // private navService = inject(NavService);
  // private widgetService = inject(Widget);

  // private componentRefs: ComponentRef<any>[] = [];
  // public pageTitle = signal('Inicio');
  
  // constructor() {
  //   this.navService.title$.subscribe(title => {
  //     this.pageTitle.set(title);
  //   });
  // }

  ngOnInit(): void {
    // this.navService.widgets$.subscribe(widgets => {
    //   this.loadWidgets(widgets);
    // });
  }

  // ngOnDestroy(): void {
  //   this.clearWidgets();
  // }

  // private loadWidgets(widgetConfigs: WidgetConfig[]): void {
  //   // Clear existing widgets
  //   this.clearWidgets();

  //   // Sort widgets by position if specified
  //   const sortedWidgets = [...widgetConfigs].sort((a, b) => 
  //     (a.position || 0) - (b.position || 0)
  //   );

  //   // Load each widget dynamically
  //   sortedWidgets.forEach(widgetConfig => {
  //     const widgetType = this.widgetService.getWidget(widgetConfig.component);
  //     if (widgetType) {
  //       const componentRef = this.widgetContainer.createComponent(widgetType);
        
  //       // Pass configuration to widget if available
  //       if (widgetConfig.config && componentRef.instance.config) {
  //         componentRef.instance.config = widgetConfig.config;
  //       }
        
  //       this.componentRefs.push(componentRef);
  //     }
  //   });
  // }

  // private clearWidgets(): void {
  //   this.componentRefs.forEach(ref => ref.destroy());
  //   this.componentRefs = [];
  //   this.widgetContainer.clear();
  // }
}
