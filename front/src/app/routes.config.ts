// routes.config.ts
import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';

export const PROTECTED_ROUTES: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'animals', component: Dashboard },
  { path: 'adoptions', component: Dashboard },
  { path: 'volunteers', component: Dashboard },
  { path: 'callendar', component: Dashboard },
  { path: 'settings', component: Dashboard },
];
