import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../todos/models/todo.model';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-todo-card',
  imports: [NgStyle],
  templateUrl: './todo-card.html',
  styleUrl: './todo-card.scss',
})
export class TodoCard {
  @Input() todo!: Todo;
  @Output() update = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<Todo>();
  @Output() toggle = new EventEmitter<Todo>();
  updateTodo() {
    this.update.emit(this.todo);
  }
  deleteTodo() {
    this.delete.emit(this.todo);
    
  }
  toggleComplete() {
    this.toggle.emit(this.todo);
  }
}
