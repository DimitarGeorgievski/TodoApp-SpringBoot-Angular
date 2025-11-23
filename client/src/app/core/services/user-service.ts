import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../feature/users/models/user.model';
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080';
  user = signal<User>(null);
  getUser(userId: number) {
    return this.http.get<User>(`${this.apiUrl}/api/users/${userId}`).pipe(
      tap((res) => {
        this.user.set(res);
      })
    );
  }
}
