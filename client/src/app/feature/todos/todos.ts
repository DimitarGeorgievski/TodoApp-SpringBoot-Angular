import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TodoService } from '../../core/services/todo-service';
import { Todo } from './models/todo.model';
import { PageEvent } from '@angular/material/paginator';
import { TodoCard } from '../todo-card/todo-card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NotificationsService } from '../../core/services/notification-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todos',
  imports: [TodoCard, MatPaginatorModule],
  templateUrl: './todos.html',
  styleUrl: './todos.scss',
})
export class Todos implements OnInit {
  private todoService = inject(TodoService);
  private notificationService = inject(NotificationsService);
  private router = inject(Router);
  ngOnInit() {
    this.refreshDisplayedTodos();
  }
  userTodos = this.todoService.userTodos;
  pageSize = 6;
  pageIndex = 0;
  displayedTodos = signal<Todo[]>([]);
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.refreshDisplayedTodos();
  }
  refreshDisplayedTodos() {
    const todos = this.userTodos();
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.displayedTodos.set(todos.slice(start, end));
  }

  onUpdate(todo: Todo) {
    this.todoService.selectedTodoId.set(todo.id);
    this.router.navigate([`/todos/update/${todo.id}`]);
  }
  onDelete(todo: Todo) {
    this.todoService.deleteTodo(todo.id).subscribe({
      next: () => {
        this.notificationService.showToast('Successfully deleted todo', true);
        this.todoService.userTodos.update((todos) => todos.filter((t) => t.id !== todo.id));
        const total = this.userTodos().length;
        const maxPage = Math.ceil(total / this.pageSize) - 1;
        if (this.pageIndex > maxPage) {
          this.pageIndex = maxPage < 0 ? 0 : maxPage;
        }
        this.refreshDisplayedTodos();
      },
      error: () => {
        this.notificationService.showToast('Failed to delete todo', false);
      },
    });
  }
  onToggle(todo: Todo) {
    this.todoService.userTodos.update((todos) =>
      todos.map((t) => (t.id === todo.id ? { ...t, completed: !t.completed } : t))
    );
    this.refreshDisplayedTodos();
  }
}
