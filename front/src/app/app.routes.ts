import { Routes } from '@angular/router';
import { PROTECTED_ROUTES } from './routes.config';
// import { Dashboard } from './pages/shelter/dashboard/dashboard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent),
    title: 'Iniciar Sesión - PetSync'
  },
  {
    path: '',
    loadComponent: () => import('./pages/shelter/dashboard/dashboard').then(m => m.Dashboard),
    children: PROTECTED_ROUTES,
    title: 'Dashboard - PetSync'
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
