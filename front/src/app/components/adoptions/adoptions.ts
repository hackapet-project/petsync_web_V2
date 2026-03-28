import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Adoption } from '../widgets/adoption/adoption';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, delay, distinctUntilChanged, Observable, of, startWith, switchMap } from 'rxjs';
import { Animal, animals } from '../../core/utils/animal_mocks';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adoptions',
  imports: [
    MatIcon,
    Adoption, ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './adoptions.html',
  styleUrl: './adoptions.css'
})
export class Adoptions implements OnInit {
  adoptions: any[] = Array(1);
  searchControl = new FormControl('');
  animalesFiltrados$!: Observable<Animal[]>;
  animalSeleccionado: Animal | null = null;

  // constructor(private animalService: AnimalService) {}

  ngOnInit() {
    // this.animalesFiltrados$ = animals
    this.animalesFiltrados$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300), // Espera 300ms después de que el usuario deje de escribir
      distinctUntilChanged(), // Solo emite si el valor cambió
      switchMap((termino) => 
        this.buscarEnMock(termino ?? ''))
    );
  }

  seleccionarAnimal(animal: Animal) {
    this.animalSeleccionado = animal;
    this.searchControl.setValue(animal.name, { emitEvent: false });
  }

  private buscarEnMock(termino: string): Observable<Animal[]> {

    const disponibles = animals.filter(
      animal => animal.state === 'available'
    );

    // Si no hay término, devuelve todos los disponibles
    if (!termino || termino.trim() === '') {
      return of(disponibles).pipe(delay(300)); // Simula latencia de red
    }

    // Filtra por término
    const terminoLower = termino.toLowerCase();
    const filtrados = disponibles.filter(animal =>
      animal.name.toLowerCase().includes(terminoLower) ||
      animal.id?.toString().includes(termino) ||
      (animal.chip && animal.chip.includes(termino)) ||
      animal.breed.toLowerCase().includes(terminoLower)
    );

    return of(filtrados).pipe(delay(300)); // Simula latencia
  }
}