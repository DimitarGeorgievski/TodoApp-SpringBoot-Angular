import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo-service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private todoService = inject(TodoService)
  private userService = inject(UserService)
  user = this.userService.user
  todoCount = this.todoService.todoLength
  completedTodos = this.todoService.compltedTodos
  uncompletedTodos = this.todoService.uncompltedTodos
}
