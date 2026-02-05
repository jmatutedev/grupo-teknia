import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'task-detail/:id',
    loadComponent: () => import('./pages/task-detail/task-detail.page').then( m => m.TaskDetailPage)
  },
  {
    path: 'create-task',
    loadComponent: () => import('./pages/create-task/create-task.page').then( m => m.CreateTaskPage)
  },
];
