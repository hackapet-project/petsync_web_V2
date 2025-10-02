import { Routes } from '@angular/router';
// import { Dashboard } from './pages/shelter/dashboard/dashboard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent),
    title: 'Iniciar Sesión - PetSync'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/shelter/dashboard/dashboard').then(m => m.Dashboard),
    title: 'Dashboard - PetSync'
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
