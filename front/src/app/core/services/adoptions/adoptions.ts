import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adoption, CreateAdoptionDto, UpdateAdoptionStateDto } from './adoptions.model';

@Injectable({
  providedIn: 'root',
})
export class Adoptions {
  private readonly base = 'http://localhost:9000/v1/adoptions';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Adoption[]> {
    return this.http.get<Adoption[]>(`${this.base}/`);
  }

  getByID(ID: string): Observable<Adoption> {
    return this.http.get<Adoption>(`${this.base}/${ID}/`);
  }

  create(dto: CreateAdoptionDto): Observable<Adoption> {
    return this.http.post<Adoption>(`${this.base}/`, dto);
  }

  updateState(ID: string, dto: UpdateAdoptionStateDto): Observable<Adoption> {
    return this.http.patch<Adoption>(`${this.base}/${ID}/`, dto);
  }
}

// export default AdoptionService
