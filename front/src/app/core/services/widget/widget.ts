// widget-registry.service.ts
import { Injectable, Type } from '@angular/core';
import { AnimalList } from '../../../components/widgets/animal-list/animal-list';
import { AnimalCard } from '../../../components/widgets/animal-card/animal-card';
// import { AnimalsWidgetComponent } from './widgets/animals-widget/animals-widget.component';
// import { EventsWidgetComponent } from './widgets/events-widget/events-widget.component';
// import { ReportsWidgetComponent } from './widgets/reports-widget/reports-widget.component';

@Injectable({
  providedIn: 'root'
})
export class Widget {
  private widgetMap: Map<string, Type<any>> = new Map();

  constructor() {
    // Register all your widgets here
    this.widgetMap.set('AnimalList', AnimalList);
    this.widgetMap.set('AnimalCard', AnimalCard);
    // this.widgetMap.set('EventsWidgetComponent', EventsWidgetComponent);
    // this.widgetMap.set('ReportsWidgetComponent', ReportsWidgetComponent);
    // Add more widgets as needed
  }

  getWidget(componentName: string): Type<any> | undefined {
    return this.widgetMap.get(componentName);
  }

  getWidgets(componentNames: string[]): Type<any>[] {
    return componentNames
      .map(name => this.getWidget(name))
      .filter(widget => widget !== undefined) as Type<any>[];
  }
}