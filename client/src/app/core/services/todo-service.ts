import { computed, inject, Injectable, signal } from '@angular/core';
import { Todo } from '../../feature/todos/models/todo.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080';
  userTodos = signal<Todo[]>([]);
  selectedTodoId = signal<number>(null);
  todoLength = computed(() => this.userTodos().length);
  compltedTodos = computed(() => this.userTodos().filter((todo) => todo.completed));
  uncompltedTodos = computed(() => this.userTodos().filter((todo) => !todo.completed));
  selectedTodo = computed(() => this.userTodos().find((todo) => todo.id === this.selectedTodoId()));
  updateTodo(todo: Todo) {
    return this.http.put<Todo>(`${this.apiUrl}/api/todos/${todo.id}`, todo).pipe(
      tap((updatedTodo) => {
        const todos = this.userTodos();
        const index = todos.findIndex((t) => t.id === updatedTodo.id);
        if (index !== -1) {
          todos[index] = updatedTodo;
          this.userTodos.set(todos);
        }
      })
    );
  }
  deleteTodo(todoId: number) {
    return this.http.delete(`${this.apiUrl}/api/todos/${todoId}`).pipe(
      tap(() => {
        const todos = this.userTodos().filter((t) => t.id !== todoId);
        this.userTodos.set(todos);
      })
    );
  }
  createTodo(data: Todo, userId: number) {
    return this.http.post<Todo>(`${this.apiUrl}/api/todos/user/${userId}`, data).pipe(
      tap((res: Todo) => {
        this.userTodos.update((todos) => [...todos, res]);
      })
    );
  }
}
