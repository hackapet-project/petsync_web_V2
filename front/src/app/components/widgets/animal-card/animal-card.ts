import { Component, inject, input } from '@angular/core';
import { Animal } from '../../../core/services/animals/animals.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Modal } from '../modal/modal';
import { buildAdoptionFormConfig } from '../../form-generator/forms_scaffolders/adoption';
import { UsersService } from '@app/core/services/users/users';
import { Adoptions } from '@app/core/services/adoptions/adoptions';
import { CreateAdoptionDto } from '@app/core/services/adoptions/adoptions.model';

@Component({
  selector: 'animal-widget',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './animal-card.html',
  styleUrl: './animal-card.css'
})
export class AnimalCard {
  private readonly dialog = inject(MatDialog);
  private readonly usersService = inject(UsersService);
  private readonly adoptionsService = inject(Adoptions);

  // public animal = input<Animal>()
  animal = input.required<Animal>();

  private colors = [
    '#6366F1', // azul
    '#10B981', // verde
    '#F59E0B', // amarillo
    '#EF4444', // rojo
    '#3B82F6', // celeste
    '#8B5CF6', // violeta
    '#EC4899', // rosa
  ];

  getColor(name: string): string {
    let hash = 0;
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }
      const index = Math.abs(hash) % this.colors.length;
      return this.colors[index];
  }

  openAdoptionModal(): void {
    this.usersService.getAll().subscribe({
      next: (users) => {
        this.dialog.open(Modal, {
          width: '600px',
          disableClose: true,
          data: {
            title: `Crear adopción para ${this.animal().name}`,
            config: buildAdoptionFormConfig(users),
            submitAction: (result: Pick<CreateAdoptionDto, 'adoptant'>) =>
              this.adoptionsService.create({
                animal: this.animal().id,
                adoptant: result.adoptant,
              }),
          },
        });
      },
    });
  }
}
