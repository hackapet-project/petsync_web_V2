import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  public isLoading: boolean = true

  // constructor(private dashboardService: DashboardService) {}


  // ngOnInit() {
  //   this.userRole = localStorage.getItem('userRole') || 'regular';
  //   this.loadDashboard();
  // }

  // loadDashboard() {
  //   // Get configuration for this user role
  //   const config = this.dashboardService.getDashboardConfig(this.userRole);
  //   this.widgets = config.widgets;

  //   // Load all necessary data
  //   this.dashboardService.loadDashboardData(this.userRole).subscribe(
  //     data => {
  //       this.dashboardData = data;
  //       this.isLoading = false;
  //     },
  //     error => {
  //       console.error('Error loading dashboard:', error);
  //       this.isLoading = false;
  //     }
  //   );
  // }

  // getWidgetData(widget: Widget): any[] {
  //   return this.dashboardData[widget.dataSource] || [];
  // }

  // getStatCount(widget: Widget): number {
  //   return this.getWidgetData(widget).length;
  // }
}
