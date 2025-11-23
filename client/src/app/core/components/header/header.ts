import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo-service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private todoService = inject(TodoService)
  todoCount = this.todoService.todoLength
  completedTodos = this.todoService.compltedTodos
  uncompletedTodos = this.todoService.uncompltedTodos
}
