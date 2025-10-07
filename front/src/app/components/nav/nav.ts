// services/navigation.service.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Nav as NavService } from '../../core/services/nav/nav';
import { MatIcon } from '@angular/material/icon';
import { NavItem } from '../../core/services/nav/config';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.html',
  styleUrls: ['./nav.css'],
  imports: [
    CommonModule,
    RouterModule,
    MatIcon
  ],
  standalone: true,
})
export class Nav {
  navItems: NavItem[] = [];

  constructor(private navService: NavService) {}

  ngOnInit() {
    this.navService.getNavigationItems().subscribe(items => {
      this.navItems = items;
    });
  }

  setActiveRoute(title: string) {
    this.navService.setTitle(title)
  }
}
