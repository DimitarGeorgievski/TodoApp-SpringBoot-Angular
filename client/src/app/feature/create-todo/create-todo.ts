import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TodoService } from '../../core/services/todo-service';
import { NotificationsService } from '../../core/services/notification-service';
import { createTodo, Todo } from '../todos/models/todo.model';
import { UserService } from '../../core/services/user-service';

@Component({
  selector: 'app-create-todo',
  imports: [FormsModule, MatIconModule, NgClass],
  templateUrl: './create-todo.html',
  styleUrl: './create-todo.scss',
})
export class CreateTodo {
  private todoService = inject(TodoService);
  private userService = inject(UserService);
  private notificationService = inject(NotificationsService);
  private router = inject(Router);
  user = this.userService.user;
  selectedTodo = this.todoService.selectedTodo;
  todoLength = this.todoService.userTodos.length + 1;
  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const { todoTitle, todoDescription } = form.value;
    const createdTodo: createTodo = {
      title: todoTitle,
      description: todoDescription,
      completed: false,
    };
    this.todoService.createTodo(createdTodo, this.user().id).subscribe({
      next: () => {
        this.notificationService.showToast('sucessfully created todo', true);
        this.router.navigate(['/todos']);
      },
      error: (err: Error) => {
        this.notificationService.showToast(err.message, false);
      },
    });
  }
}
