import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const securityGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authorization = sessionStorage.getItem('Authorization');

  if (!authorization) {
    router.navigate(['/inicio']);
    return false;
  } else if (tokenExpired(authorization)) {
    router.navigate(['/inicio']);
    sessionStorage.removeItem('Authorization');
    return false;
  }
  return true;
};

function tokenExpired(token: string): boolean {
  const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
  return (Math.floor(Date.now() / 1000)) >= expiry;
}