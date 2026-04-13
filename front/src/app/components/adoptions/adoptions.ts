import { Component, OnInit, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AdoptionWidget } from '../widgets/adoption/adoption';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, delay, distinctUntilChanged, Observable, of, startWith, switchMap } from 'rxjs';
import { Animal, animals } from '@app/core/utils/animal_mocks';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Modal } from '@app/components/widgets/modal/modal';
// front\src\app\components\widgets\modal\modal

@Component({
  selector: 'app-adoptions',
  imports: [
    MatIcon,
    AdoptionWidget, ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './adoptions.html',
  styleUrl: './adoptions.css'
})
export class Adoptions implements OnInit {
  animals: Animal[] = animals;
  adoptions: any[] = [
    {
      adoptant_email: "diego@email.com",
      adoptant_name: "Diego",
      animal_id: "58590345",
      responsable_id: "2938742374",
    }
  ];
  searchControl = new FormControl('');
  filteredAnimals$!: Observable<Animal[]>;
  animalSelected: Animal | null = null;
  
  private dialog = inject(MatDialog)

  ngOnInit() {
    this.filteredAnimals$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300), // Espera 300ms después de que el usuario deje de escribir
      distinctUntilChanged(), // Solo emite si el valor cambió
      switchMap((term: string | null) =>
        this.searchInMock(term ?? ''))
    );
  }

  selectAnimal(animal: Animal) {
    this.animalSelected = animal;
    this.searchControl.setValue(animal.name, { emitEvent: false });
  }

  private searchInMock(term: string): Observable<Animal[]> {
    if (!term || term.trim() === '') {
      return of(animals);
    }

    const termLower = term.toLowerCase();
    const filtered = animals.filter(animal =>
      animal.name.toLowerCase().includes(termLower) ||
      animal.id?.toString().includes(term) ||
      (animal.chip && animal.chip.includes(term)) ||
      animal.breed.toLowerCase().includes(termLower)
    );

    return of(filtered);
  }

  newAdoption() {
    const dialogRef = this.dialog.open(Modal, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Save into animals or adoptions array
        this.adoptions.push(result);

        // or if it's really an adoption:
        // this.adoptions.push(result);

        console.log('New adoption added:', result);
      }
    });
  }
}