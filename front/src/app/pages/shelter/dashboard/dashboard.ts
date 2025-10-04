import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatIcon
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
