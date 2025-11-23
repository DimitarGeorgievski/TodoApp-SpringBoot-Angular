import { Todo } from "../../todos/models/todo.model";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  todos: Todo[];
  createdAt: string;
  updatedAt: string;
}