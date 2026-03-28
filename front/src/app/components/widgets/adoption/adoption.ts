import { Component, input } from '@angular/core';

@Component({
  selector: 'adoption',
  imports: [],
  templateUrl: './adoption.html',
  styleUrl: './adoption.css'
})
export class Adoption {
  // adoption = input.required<Adoption>();
  animal = {
    name: 'Luna'
  }
}
