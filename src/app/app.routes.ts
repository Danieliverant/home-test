import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'posts',
  },
  {
    path: 'posts',
    loadComponent: () => import('./posts/posts').then((m) => m.Posts),
  },
  {
    path: 'posts/:id',
    loadComponent: () => import('./posts/post-details/post-details').then((m) => m.PostDetails),
  },
  {
    path: 'users',
    loadComponent: () => import('./users/users').then((m) => m.Users),
  },
  {
    path: 'users/:id',
    loadComponent: () => import('./users/user-details/user-details').then((m) => m.UserDetails),
  },
];
