import { Component, OnInit, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AdoptionWidget } from '../widgets/adoption/adoption';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, delay, distinctUntilChanged, Observable, of, startWith, switchMap } from 'rxjs';
import { Animal, animals } from '@app/core/utils/animal_mocks';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Modal } from '@app/components/widgets/modal/modal';
import { Adoptions as AdoptionService } from '@app/core/services/adoptions/adoptions';
import { Adoption, CreateAdoptionDto } from '@app/core/services/adoptions/adoptions.model';
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
  private adoptionService = inject(AdoptionService)
  
  animals: Animal[] = animals;
  searchControl = new FormControl('');
  filteredAnimals$!: Observable<Animal[]>;
  animalSelected: Animal | null = null;
  
  private dialog = inject(MatDialog)

  adoptions = signal<Adoption[]>([]);
  loading   = signal(true);
  error     = signal<string | null>(null);

  ngOnInit() {
    this.adoptionService.getAll().subscribe({
      next: (data: any) => { this.adoptions.set(data); this.loading.set(false); },
      error: () => { this.error.set('Failed to load adoptions.'); this.loading.set(false); },
    });
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

    dialogRef.afterClosed().subscribe((result: CreateAdoptionDto) => {
      if (result) {
        console.log(result)
        // Save into animals or adoptions array
        this.adoptionService.create(result)
      }
    });
  }
}