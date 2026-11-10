import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../auth/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);
  
  const sesion = authService.isSession() ? true : false;
  return sesion ? true : router.createUrlTree(['/']);
};
