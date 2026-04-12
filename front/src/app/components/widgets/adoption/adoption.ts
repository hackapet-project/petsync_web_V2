import { Component, input } from '@angular/core';
import { Animal } from '../../../core/utils/animal_mocks';

@Component({
  selector: 'adoption',
  imports: [],
  templateUrl: './adoption.html',
  styleUrl: './adoption.css'
})
export class Adoption {
  // adoption = input.required<Adoption>();
  animal = input.required<Animal>();
}
