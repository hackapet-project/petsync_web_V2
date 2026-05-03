import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, catchError, fromEvent, interval, map, merge, of, startWith, switchMap, takeUntil, timeout, filter } from 'rxjs';
import { Animal } from '../../../core/services/animals/animals.model';
import { AnimalsService } from '../../../core/services/animals/animals';

@Component({
  selector: 'animals-widget',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './animal-list.html',
  styleUrl: './animal-list.css'
})
export class AnimalList implements OnInit, OnDestroy {
  private readonly animalsService = inject(AnimalsService);
  private readonly destroy$ = new Subject<void>();

  public animals: Animal[] = [];
  public paginatedAnimals: Animal[] = [];
  public loading = true;
  public error: string | null = null;
  private hasLoadedAtLeastOnce = false;
  
  currentPage: number = 1;
  itemsPerPage: number = 7; // Adjust as needed
  totalPages: number = 0;


  ngOnInit(): void {
    const visibility$ = fromEvent(document, 'visibilitychange').pipe(
      filter(() => !document.hidden),
      map(() => null),
    );

    const focus$ = fromEvent(window, 'focus').pipe(map(() => null));

    merge(
      interval(15000),
      visibility$,
      focus$,
    ).pipe(
      startWith(0),
      switchMap(() => {
        if (!this.hasLoadedAtLeastOnce) {
          this.loading = true;
        }
        this.error = null;

        return this.animalsService.getAll().pipe(
          timeout(10000),
          map((animals) => ({ animals, error: null as string | null })),
          catchError(() => of({
            animals: null,
            error: 'No se pudieron cargar los animales.',
          })),
        );
      }),
      takeUntil(this.destroy$)
    ).subscribe((result) => {
      this.loading = false;
      this.hasLoadedAtLeastOnce = true;

      if (result.animals) {
        this.animals = result.animals;
        this.currentPage = 1;
        this.updatePagination();
        return;
      }

      this.error = result.error;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private colors = [
    '#6366F1', // azul
    '#10B981', // verde
    '#F59E0B', // amarillo
    '#EF4444', // rojo
    '#3B82F6', // celeste
    '#8B5CF6', // violeta
    '#EC4899', // rosa
  ];

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get visiblePages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const DELTA = 2
    const MIN_PAGES = 7

    if (this.totalPages <= MIN_PAGES) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      // Calculate range around current page
      const startPage = Math.max(2, this.currentPage - DELTA);
      const endPage = Math.min(this.totalPages - 1, this.currentPage + DELTA);
      
      // Add ellipsis after first page if needed
      if (startPage > 2) { pages.push('...'); }
      
      // Add pages around current page
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < this.totalPages - 1) { pages.push('...'); }
      
      pages.push(this.totalPages);
    }

    return pages;
  }


  getColor(name: string): string {
    let hash = 0;
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }
      const index = Math.abs(hash) % this.colors.length;
      return this.colors[index];
  }
  
  updatePagination() {
    this.totalPages = Math.ceil(this.animals.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedAnimals = this.animals.slice(startIndex, endIndex);
  }

  goToPage(page: number | string) {
    if (typeof page === 'number') {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}
