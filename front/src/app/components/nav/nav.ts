// services/navigation.service.ts
import { inject, Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { config, NavConfig, NavItem, UserRole } from './config';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Nav as NavService } from '../../core/services/nav/nav';
import { MatIcon } from '@angular/material/icon';

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
  private userRole$ = new BehaviorSubject<UserRole>('regular');
  private router = inject(Router)
  private navigationConfig: NavConfig = config

  navItems: NavItem[] = [];

  constructor(private navigationService: NavService) {}

  ngOnInit() {
    this.navigationService.getNavigationItems().subscribe(items => {
      this.navItems = items;
    });
  }
}