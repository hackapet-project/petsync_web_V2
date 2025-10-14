import { Component, input } from '@angular/core';
import { Animal, animals } from '../../../core/utils/animal_mocks';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'animal-widget',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './animal-card.html',
  styleUrl: './animal-card.css'
})
export class AnimalCard {

  // public animal = input<Animal>()
  animal = input.required<Animal>();

  private colors = [
    '#6366F1', // azul
    '#10B981', // verde
    '#F59E0B', // amarillo
    '#EF4444', // rojo
    '#3B82F6', // celeste
    '#8B5CF6', // violeta
    '#EC4899', // rosa
  ];

  getColor(name: string): string {
    let hash = 0;
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }
      const index = Math.abs(hash) % this.colors.length;
      return this.colors[index];
  }
}
