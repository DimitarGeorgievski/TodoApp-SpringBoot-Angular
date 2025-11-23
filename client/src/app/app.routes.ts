import { Routes } from '@angular/router';
import { NotFound } from './core/components/not-found/not-found';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { Login } from './feature/login/login';
import { Todos } from './feature/todos/todos';
import { authGuard } from './core/guards/auth-guard';
import { Register } from './feature/register/register';
import { MainLayout } from './layout/main-layout/main-layout';
import { UpdateTodo } from './feature/update-todo/update-todo';
import { CreateTodo } from './feature/create-todo/create-todo';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthLayout,
    children: [{ path: '', component: Login }],
  },
  {
    path: 'register',
    component: AuthLayout,
    children: [{ path: '', component: Register }],
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      { path: 'todos', component: Todos },
      { path: '', redirectTo: 'todos', pathMatch: 'full' },
      { path: 'todos/update/:id', component: UpdateTodo },
      { path: 'todos/create', component: CreateTodo },
    ],
  },
  {
    path: '**',
    component: NotFound,
  },
];
