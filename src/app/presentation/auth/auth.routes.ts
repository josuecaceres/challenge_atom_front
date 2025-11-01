import { Routes } from '@angular/router';

const dashBoardRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth.component'),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login-form/login-form.component'),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register-form/register-form.component'),
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];

export default dashBoardRoutes;
