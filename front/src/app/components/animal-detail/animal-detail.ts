import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Animal, UpdateAnimalDto } from '../../core/services/animals/animals.model';
import { AnimalsService } from '../../core/services/animals/animals';
import { Modal } from '../widgets/modal/modal';
import { buildAnimalFormConfig } from '../form-generator/forms_scaffolders/animal';
import { UsersService } from '../../core/services/users/users';
import { Adoptions } from '../../core/services/adoptions/adoptions';
import { buildAdoptionFormConfig } from '../form-generator/forms_scaffolders/adoption';
import { CreateAdoptionDto } from '../../core/services/adoptions/adoptions.model';

@Component({
  selector: 'app-animal-detail',
  imports: [
    RouterModule,
    MatIcon
  ],
  templateUrl: './animal-detail.html',
  styleUrl: './animal-detail.css'
})
export class AnimalDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly animalsService = inject(AnimalsService);
  private readonly dialog = inject(MatDialog);
  private readonly usersService = inject(UsersService);
  private readonly adoptionsService = inject(Adoptions);

  public animal = signal<Animal | null>(null);
  public loading = signal(true);
  public error = signal<string | null>(null);

  ngOnInit(): void {
    const animalId = this.route.snapshot.paramMap.get('id');
    if (!animalId) {
      this.error.set('Animal no encontrado.');
      this.loading.set(false);
      return;
    }

    this.loadAnimal(animalId);
  }

  openEditAnimalModal(): void {
    const currentAnimal = this.animal();
    if (!currentAnimal) {
      return;
    }

    const dialogRef = this.dialog.open(Modal, {
      width: '700px',
      disableClose: true,
      data: {
        title: `Editar ${currentAnimal.name}`,
        config: buildAnimalFormConfig(currentAnimal),
        submitAction: (result: Omit<UpdateAnimalDto, 'shelter'>): Observable<Animal> =>
          this.animalsService.update(
            currentAnimal.id,
            this.normalizeUpdateAnimalPayload(result, currentAnimal.shelterId),
          ),
      },
    });

    dialogRef.afterClosed().subscribe((updatedAnimal: Animal | undefined) => {
      if (!updatedAnimal) {
        return;
      }

      this.animal.set(updatedAnimal);
      this.error.set(null);
    });
  }

  openAdoptionModal(): void {
    const currentAnimal = this.animal();
    if (!currentAnimal) {
      return;
    }

    this.usersService.getAll().subscribe({
      next: (users) => {
        const dialogRef = this.dialog.open(Modal, {
          width: '600px',
          disableClose: true,
          data: {
            title: `Crear adopción para ${currentAnimal.name}`,
            config: buildAdoptionFormConfig(users),
            submitAction: (result: Pick<CreateAdoptionDto, 'adoptant'>): Observable<unknown> =>
              this.adoptionsService.create({
                animal: currentAnimal.id,
                adoptant: result.adoptant,
              }),
          },
        });

        dialogRef.afterClosed().subscribe();
      },
      error: () => {
        this.error.set('No se pudieron cargar los usuarios.');
      },
    });
  }

  private loadAnimal(animalId: string): void {
    this.loading.set(true);
    this.animalsService.getById(animalId).subscribe({
      next: (animal) => {
        this.animal.set(animal);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Animal no encontrado.');
        this.loading.set(false);
      },
    });
  }

  private normalizeUpdateAnimalPayload(
    formValue: Omit<UpdateAnimalDto, 'shelter'>,
    shelterId: string,
  ): UpdateAnimalDto {
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
