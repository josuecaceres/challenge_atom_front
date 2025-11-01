import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('atomTaksToken');

  if (!token) {
    router.navigateByUrl('/auth');
    return false;
  }

  return true;
};

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('atomTaksToken');

  if (token) {
    router.navigateByUrl('/dashboard');
    return false;
  }

  return true;
};
