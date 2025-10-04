import { Injectable } from '@angular/core';
import { DashConfig, dashConfig } from './config';

@Injectable({
  providedIn: 'root'
})
export class Dashboard {

  // constructor(private apiService: ApiService) {}
  // private dashboardConfigs: DashConfig = dashConfig

  // getDashboardConfig(role: string): DashboardConfig {
  //   return this.dashboardConfigs[role] || this.dashboardConfigs.regular;
  // }

  // loadDashboardData(role: string): Observable<any> {
  //   const config = this.getDashboardConfig(role);
  //   const requests = {};

  //   // Get unique data sources
  //   const dataSources = [...new Set(config.widgets.map(w => w.dataSource))];

  //   // Create API requests for each data source
  //   dataSources.forEach(source => {
  //     requests[source] = this.getDataBySource(source);
  //   });

  //   return forkJoin(requests);
  // }

  // private getDataBySource(source: string): Observable<any[]> {
  //   switch (source) {
  //     case 'animals':
  //       return this.apiService.getAnimals();
  //     case 'users':
  //       return this.apiService.getUsers();
  //     case 'shelters':
  //       return this.apiService.getShelters();
  //     default:
  //       return new Observable(observer => observer.next([]));
  //   }
  // }
}
