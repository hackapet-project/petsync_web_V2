import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Animal, animals } from '../../../core/utils/animal_mocks';

@Component({
  selector: 'animals-widget',
  imports: [
    CommonModule
  ],
  templateUrl: './animal-list.html',
  styleUrl: './animal-list.css'
})
export class AnimalList implements OnInit {

  public animals: Animal[] = animals
  public paginatedAnimals: Animal[] = [];
  
  currentPage: number = 1;
  itemsPerPage: number = 7; // Adjust as needed
  totalPages: number = 0;


  ngOnInit(): void {
    this.loadAnimals();
    this.updatePagination();
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
      for( let i =1; 1 <= this.totalPages; i++) {
        pages.push(i)
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
  
  loadAnimals() {
    // Your logic to load animals
    // this.animals = ...
    this.totalPages = Math.ceil(this.animals.length / this.itemsPerPage);
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
