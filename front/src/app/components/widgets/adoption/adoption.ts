import { Component, input } from '@angular/core';
import { Animal } from '../../../core/utils/animal_mocks';

interface Adoption {
  animal_id: string;
  responsable_id: string;
  adoptant_name: string;
  adoptant_email: string;
}

@Component({
  selector: 'app-adoption',
  imports: [],
  templateUrl: './adoption.html',
  styleUrl: './adoption.css'
})
export class AdoptionWidget {
  adoptionData = input.required<Adoption>();
  // animal = input.required();
}
