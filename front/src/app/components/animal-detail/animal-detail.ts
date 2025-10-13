import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map } from 'rxjs/operators';
import { Animal, animals } from '../../core/utils/animal_mocks';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-animal-detail',
  imports: [
    RouterModule,
    MatIcon
  ],
  templateUrl: './animal-detail.html',
  styleUrl: './animal-detail.css'
})
export class AnimalDetail {
  private animals: Animal[] = animals
  private route = inject(ActivatedRoute);
  
  animalId = toSignal(
    this.route.paramMap.pipe(map(params => params.get('id'))),
    { initialValue: '' } // prevents undefined early on
  );

  public animal = computed(() => {
    const id = this.animalId();
    if (!id) return null;
    return this.animals.find(animal => animal?.id === id) ?? null;
  });
}
