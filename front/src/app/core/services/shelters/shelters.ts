import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShelterListItem } from './shelters.model';

@Injectable({
  providedIn: 'root'
})
export class SheltersService {
  private readonly http = inject(HttpClient);
  private readonly base = 'http://localhost:9000/v1/shelters';

  getAll(): Observable<ShelterListItem[]> {
    return this.http.get<ShelterListItem[]>(`${this.base}/`);
  }
}
