import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { User } from '../../feature/users/models/user.model';
import { Todo } from '../../feature/todos/models/todo.model';
import { TodoService } from './todo-service';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  private http = inject(HttpClient);
  private todoService = inject(TodoService);
  private userService = inject(UserService);
  router = inject(Router);
  userData: Todo[] = null;
  login(email: string, password: string) {
    return this.http.post<User>(`${this.apiUrl}/api/auth/login`, { email, password }).pipe(
      tap((res) => {
        this.todoService.userTodos.set(res.todos);
        this.userData = res.todos;
        this.userService.getUser(res.id).subscribe();
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
    this.userData = null;
    this.router.navigate(['/login']);
  }
}
