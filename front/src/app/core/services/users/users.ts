import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserListItem } from './users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly http = inject(HttpClient);
  private readonly base = 'http://localhost:9000/v1/users';

  getAll(): Observable<UserListItem[]> {
    return this.http.get<UserListItem[]>(`${this.base}/`);
  }
}
