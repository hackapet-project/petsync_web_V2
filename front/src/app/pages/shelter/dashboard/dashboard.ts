import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Nav } from '../../../components/nav/nav';
import { Dashboard as Dash } from '../../../components/dashboard/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatIcon,
    Nav,
    Dash,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  private router = inject(Router)

  isActive(path: string): boolean {
    return this.router.url === path;
  }
}
