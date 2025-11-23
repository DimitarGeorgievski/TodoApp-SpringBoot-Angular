import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TodoService } from '../../core/services/todo-service';
import { Todo } from '../todos/models/todo.model';
import { Router } from '@angular/router';
import { NotificationsService } from '../../core/services/notification-service';

@Component({
  selector: 'app-update-todo',
  imports: [FormsModule, MatIconModule, NgClass],
  templateUrl: './update-todo.html',
  styleUrl: './update-todo.scss',
})
export class UpdateTodo {
  private todoService = inject(TodoService);
  private notificationService = inject(NotificationsService);
  private router = inject(Router);
  selectedTodo = this.todoService.selectedTodo;
  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const { todoTitle, todoDescription } = form.value;
    const updatedTodo: Todo = {
      id: this.selectedTodo().id,
      title: todoTitle,
      description: todoDescription,
      completed: false,
    };
    this.todoService.updateTodo(updatedTodo).subscribe({
      next: () => {
        this.notificationService.showToast('sucessfully updated todo', true);
        this.router.navigate(['/todos']);
      },
      error: (err: Error) => {
        this.notificationService.showToast(err.message, false);
      },
    });
  }
}
