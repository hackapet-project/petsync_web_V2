import { Component, inject, output, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Nav as NavService } from '../../core/services/nav/nav';
import { Animal, animals } from '../../core/utils/animal_mocks';
import { CommonModule } from '@angular/common';
import { AnimalList } from '../widgets/animal-list/animal-list';

@Component({
  selector: 'app-dash',
  imports: [
    RouterModule,
    CommonModule,
    AnimalList
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  private navService = inject(NavService);
  public pageTitle = signal('Inicio');
  
  // title: string = 
  constructor() {
    this.navService.title$.subscribe(title => {
      this.pageTitle.set(title);
    });
  }
}
