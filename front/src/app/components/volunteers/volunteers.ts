import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { forkJoin } from 'rxjs';
import { SheltersService } from '@app/core/services/shelters/shelters';
import { UsersService } from '@app/core/services/users/users';
import { UserListItem } from '@app/core/services/users/users.model';

@Component({
  selector: 'app-volunteers',
  imports: [CommonModule, ReactiveFormsModule, MatIcon],
  templateUrl: './volunteers.html',
  styleUrl: './volunteers.css',
})
export class Volunteers implements OnInit {
  private readonly usersService = inject(UsersService);
  private readonly sheltersService = inject(SheltersService);

  readonly searchControl = new FormControl('', { nonNullable: true });

  readonly volunteers = signal<UserListItem[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly searchTerm = signal('');

  readonly filteredVolunteers = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();

    return this.volunteers().filter((volunteer) => {
      if (!term) {
        return true;
      }

      return (
        volunteer.name.toLowerCase().includes(term) ||
        volunteer.email.toLowerCase().includes(term) ||
        (volunteer.shelter ?? '').toLowerCase().includes(term) ||
        (volunteer.shelter_name ?? '').toLowerCase().includes(term)
      );
    });
  });

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe((value) => {
      this.searchTerm.set(value.trim());
    });

    forkJoin({
      users: this.usersService.getAll(),
      shelters: this.sheltersService.getAll(),
    }).subscribe({
      next: ({ users, shelters }) => {
        const sheltersById = new Map(
          shelters.map((shelter) => [shelter.shelter_id, shelter.name])
        );

        this.volunteers.set(
          users.map((user) => ({
            ...user,
            shelter_name: user.shelter_name ?? (user.shelter ? sheltersById.get(user.shelter) ?? null : null),
          }))
        );
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los voluntarios.');
        this.loading.set(false);
      },
    });
  }

  getStatusLabel(isActive: boolean): string {
    return isActive ? 'Activo' : 'Inactivo';
  }

  formatDate(date: string): string {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(date));
  }
}
