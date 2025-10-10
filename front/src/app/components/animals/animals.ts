import { Component } from '@angular/core';
import { Animal, animals } from '../../core/utils/animal_mocks';
import { AnimalCard } from '../widgets/animal-card/animal-card';

@Component({
  selector: 'app-animals',
  imports: [
    AnimalCard
  ],
  templateUrl: './animals.html',
  styleUrl: './animals.css'
})
export class Animals {
  public animals: Animal[] = animals;

}
