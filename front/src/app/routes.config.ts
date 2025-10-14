// routes.config.ts
import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Animals } from './components/animals/animals';
import { AnimalDetail } from './components/animal-detail/animal-detail';

export const PROTECTED_ROUTES: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { 
    path: 'dashboard', 
    component: Dashboard, // or create a proper DashboardContent component
    data: { title: 'Inicio' }
  },
  { path: 'animals', component: Animals, data: { title: 'Animales' } },
  { path: 'animals/:id', component: AnimalDetail, data: { title: 'Refupet' } },
  { path: 'adoptions', component: Animals, data: { title: 'Adopciones' } },
  { path: 'volunteers', component: Animals, data: { title: 'Voluntarios' } },
  { path: 'callendar', component: Animals, data: { title: 'Calendario' } },
  { path: 'settings', component: Animals, data: { title: 'Configuración' } },
];