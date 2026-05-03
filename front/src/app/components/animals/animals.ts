import { Component, OnInit, inject, signal } from '@angular/core';
import { AnimalCard } from '../widgets/animal-card/animal-card';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Animal, CreateAnimalDto } from '../../core/services/animals/animals.model';
import { AnimalsService } from '../../core/services/animals/animals';
import { Modal } from '../widgets/modal/modal';
import { animalFormConfig } from '../form-generator/forms_scaffolders/animal';
import { AuthService } from '../../core/services/auth/auth.service';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-animals',
  imports: [
    AnimalCard,
    MatIcon,
  ],
  templateUrl: './animals.html',
  styleUrl: './animals.css'
})
export class Animals implements OnInit {
  private readonly animalsService = inject(AnimalsService);
  private readonly dialog = inject(MatDialog);
  private readonly authService = inject(AuthService);

  public animals = signal<Animal[]>([]);
  public loading = signal(true);
  public error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadAnimals();
  }

  openCreateAnimalModal(): void {
    const dialogRef = this.dialog.open(Modal, {
      width: '700px',
      disableClose: true,
      data: {
        title: 'Nuevo animal',
        config: animalFormConfig,
        submitAction: (result: Omit<CreateAnimalDto, 'shelter'>): Observable<Animal> => {
          const shelterId = this.resolveShelterId();
          if (!shelterId) {
            return throwError(() => new Error('No se pudo resolver el refugio del usuario.'));
          }

          return this.animalsService.create(this.normalizeCreateAnimalPayload(result, shelterId));
        },
      },
    });

    dialogRef.afterClosed().subscribe((created) => {
      if (!created) {
        return;
      }
      this.error.set(null);
      this.loadAnimals();
    });
  }

  private loadAnimals(): void {
    this.animalsService.getAll().subscribe({
      next: (animals) => {
        this.animals.set(animals);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los animales.');
        this.loading.set(false);
      },
    });
  }

  private resolveShelterId(): string | null {
    return this.authService.getCurrentUser()?.shelter ?? this.animals()[0]?.shelterId ?? null;
  }

  private normalizeCreateAnimalPayload(
    formValue: Omit<CreateAnimalDto, 'shelter'>,
    shelterId: string,
  ): CreateAnimalDto {
    return {
      shelter: shelterId,
      ...formValue,
      birth_date: formValue.birth_date || null,
      outcome_date: formValue.outcome_date || null,
      last_vet_visit: formValue.last_vet_visit || null,
      size: formValue.size || '',
      weight: formValue.weight == null ? null : Number(formValue.weight),
      medical_notes: formValue.medical_notes || '',
      allergies: formValue.allergies || '',
      temperament: formValue.temperament || '',
      behavior_notes: formValue.behavior_notes || '',
      microchipped: !!formValue.microchipped,
      sterilized: !!formValue.sterilized,
      vaccinated: !!formValue.vaccinated,
    };
  }
}
