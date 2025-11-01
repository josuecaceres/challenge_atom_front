import { Routes } from '@angular/router';
import { NotFoundComponent } from './presentation/not-found.component';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from '@guards';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import('./presentation/auth/auth.routes'),
  },
  {
    path: 'dashboard',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./presentation/dashboard/dashboard.routes'),
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
