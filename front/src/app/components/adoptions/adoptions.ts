import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Animal } from '@app/core/services/animals/animals.model';
import { CommonModule } from '@angular/common';
import { Modal } from '@app/components/widgets/modal/modal';
import { Adoptions as AdoptionService } from '@app/core/services/adoptions/adoptions';
import { Adoption, AdoptionState, UpdateAdoptionStateDto } from '@app/core/services/adoptions/adoptions.model';
import { AnimalsService } from '@app/core/services/animals/animals';
import { buildAdoptionStateFormConfig } from '../form-generator/forms_scaffolders/adoption';

const ADOPTION_STATE_ORDER: Record<AdoptionState, number> = {
  in_review: 0,
  approved: 1,
  initiated: 2,
  frozen: 3,
  rejected: 4,
  completed: 5,
};

const ADOPTION_STATE_LABELS: Record<AdoptionState, string> = {
  initiated: 'Iniciada',
  in_review: 'En revisión',
  approved: 'Aprobada',
  frozen: 'Pausada',
  completed: 'Completada',
  rejected: 'Rechazada',
};

@Component({
  selector: 'app-adoptions',
  imports: [
    MatIcon,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './adoptions.html',
  styleUrl: './adoptions.css'
})
export class Adoptions implements OnInit {
  private readonly adoptionService = inject(AdoptionService);
  private readonly animalsService = inject(AnimalsService);
  private readonly dialog = inject(MatDialog);

  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly stateFilterControl = new FormControl<'all' | AdoptionState>('all', { nonNullable: true });

  readonly animals = signal<Animal[]>([]);
  readonly adoptions = signal<Adoption[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly searchTerm = signal('');
  readonly stateFilter = signal<'all' | AdoptionState>('all');

  readonly rows = computed(() => {
    const animalsById = new Map(this.animals().map((animal) => [animal.id, animal]));
    const term = this.searchTerm().trim().toLowerCase();
    const selectedState = this.stateFilter();

    return this.adoptions()
      .map((adoption) => {
        const animal = animalsById.get(adoption.animal);
        return {
          ...adoption,
          animalName: animal?.name ?? adoption.animal,
          userName: adoption.adoptant_name,
        };
      })
      .filter((adoption) => {
        const matchesState = selectedState === 'all' || adoption.state === selectedState;
        const matchesSearch =
          !term ||
          adoption.animalName.toLowerCase().includes(term) ||
          adoption.userName.toLowerCase().includes(term) ||
          adoption.adoptant_email.toLowerCase().includes(term);

        return matchesState && matchesSearch;
      })
      .sort((left, right) => {
        const stateDelta = ADOPTION_STATE_ORDER[left.state] - ADOPTION_STATE_ORDER[right.state];
        if (stateDelta !== 0) {
          return stateDelta;
        }

        return new Date(right.created_at).getTime() - new Date(left.created_at).getTime();
      });
  });

  ngOnInit() {
    this.searchControl.valueChanges.subscribe((value) => {
      this.searchTerm.set(value.trim());
    });

    this.stateFilterControl.valueChanges.subscribe((value) => {
      this.stateFilter.set(value);
    });

    this.animalsService.getAll().subscribe({
      next: (animals) => {
        this.animals.set(animals);
      },
      error: () => {
        this.error.set('No se pudieron cargar los animales.');
      },
    });

    this.loadAdoptions();
  }

  getStateLabel(state: AdoptionState): string {
    return ADOPTION_STATE_LABELS[state];
  }

  openEditStateModal(adoption: Adoption): void {
    const dialogRef = this.dialog.open(Modal, {
      width: '480px',
      disableClose: true,
      data: {
        title: `Estado de adopción de ${this.resolveAnimalName(adoption.animal)}`,
        config: buildAdoptionStateFormConfig(adoption.state),
        submitAction: (result: Pick<UpdateAdoptionStateDto, 'state'>) =>
          this.adoptionService.updateState(adoption.adoption_id, { state: result.state }),
      },
    });

    dialogRef.afterClosed().subscribe((updatedAdoption: Adoption | undefined) => {
      if (!updatedAdoption) {
        return;
      }

      this.adoptions.update((current) =>
        current.map((item) =>
          item.adoption_id === updatedAdoption.adoption_id ? updatedAdoption : item
        )
      );
    });
  }

  private loadAdoptions(): void {
    this.loading.set(true);
    this.adoptionService.getAll().subscribe({
      next: (data) => {
        this.adoptions.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar las adopciones.');
        this.loading.set(false);
      },
    });
  }

  private resolveAnimalName(animalId: string): string {
    return this.animals().find((animal) => animal.id === animalId)?.name ?? animalId;
  }
}
