import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { User } from '../../feature/users/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  private http = inject(HttpClient);
  router = inject(Router);
  userData = signal<User>(null);
  login(email: string, password: string) {
    return this.http.post<User>(`${this.apiUrl}/api/auth/login`, { email, password }).pipe(
      tap((res) => {
        console.log("LOGIN RESPONSE:", res);
        this.userData.set(res);
        this.router.navigate(['/todos']);
      })
    );
  }
  register(firstName: string, lastName: string, email: string, password: string) {
    return this.http
      .post<User>(`${this.apiUrl}/api/auth/register`, { firstName, lastName, email, password })
      .pipe(
        tap(() => {
          this.router.navigate(['/login']);
        })
      );
  }
  Logout() {
    this.userData.set(null);
    this.router.navigate(['/login']);
  }
}
