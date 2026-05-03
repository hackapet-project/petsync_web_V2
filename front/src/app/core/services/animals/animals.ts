import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Animal, AnimalApiResponse, CreateAnimalDto, UpdateAnimalDto } from './animals.model';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {
  private readonly http = inject(HttpClient);
  private readonly base = 'http://localhost:9000/v1/animals';

  getAll(): Observable<Animal[]> {
    return this.http
      .get<AnimalApiResponse[]>(`${this.base}/`)
      .pipe(map((animals) => animals.map(mapAnimal)));
  }

  getById(id: string): Observable<Animal> {
    return this.http
      .get<AnimalApiResponse>(`${this.base}/${id}/`)
      .pipe(map((animal) => mapAnimal(animal)));
  }

  create(dto: CreateAnimalDto): Observable<Animal> {
    return this.http
      .post<AnimalApiResponse>(`${this.base}/`, dto)
      .pipe(map((animal) => mapAnimal(animal)));
  }

  update(id: string, dto: UpdateAnimalDto): Observable<Animal> {
    return this.http
      .patch<AnimalApiResponse>(`${this.base}/${id}/`, dto)
      .pipe(map((animal) => mapAnimal(animal)));
  }
}

function mapAnimal(animal: AnimalApiResponse): Animal {
  const weightValue = animal.weight === null ? null : Number(animal.weight);

  return {
    id: animal.id,
    shelterId: animal.shelter_id,
    state: animal.status,
    name: animal.name,
    species: animal.species,
    breed: animal.breed,
    gender: animal.gender,
    size: animal.size || '',
    weight: weightValue === null ? 'unknown' : `${weightValue} kg`,
    weightValue,
    age: toAgeLabel(animal.birth_date),
    chip: animal.chip,
    birthDate: animal.birth_date,
    intakeDate: animal.intake_date,
    outcomeDate: animal.outcome_date,
    microchipped: animal.microchipped,
    sterilized: animal.sterilized,
    vaccinated: animal.vaccinated,
    medicalNotes: animal.medical_notes,
    allergies: animal.allergies,
    lastVetVisit: animal.last_vet_visit,
    temperament: animal.temperament,
    behaviorNotes: animal.behavior_notes,
  };
}

function toAgeLabel(birthDate: string | null): string {
  if (!birthDate) {
    return 'unknown';
  }

  const birth = new Date(birthDate);
  const now = new Date();
  let months =
    (now.getFullYear() - birth.getFullYear()) * 12 +
    (now.getMonth() - birth.getMonth());

  if (now.getDate() < birth.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    return 'unknown';
  }

  if (months < 12) {
    const normalizedMonths = Math.max(months, 0);
    return `${normalizedMonths} ${normalizedMonths === 1 ? 'month' : 'months'}`;
  }

  const years = Math.floor(months / 12);
  return `${years} ${years === 1 ? 'year' : 'years'}`;
}
