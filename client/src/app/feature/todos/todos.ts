import { Component, inject, OnInit, signal } from '@angular/core';
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
    this.updateDisplayedTodos();
  }
  userTodos = this.todoService.userTodos;
  displayedTodos = signal<Todo[]>([]);
  pageSize = 6;
  pageIndex = 0;
  updateDisplayedTodos() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.displayedTodos.set(this.userTodos().slice(start, end));
  }
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedTodos();
  }
  onUpdate(todo: Todo) {
    this.router.navigate(['/todo/update']);
    this.todoService.selectedTodoId.set(todo.id);
  }

  onDelete(todo: Todo) {
    this.todoService.deleteTodo(todo.id).subscribe({
      next: () => {
        this.updateDisplayedTodos();
        this.notificationService.showToast('Successfully deleted todo', true);
      },
    });
  }
  onToggle(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe({
      next: () => {
        this.updateDisplayedTodos();
      },
    });
  }
}
