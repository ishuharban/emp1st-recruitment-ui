import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (isLoggedIn) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  //  SSO: URL se token check karo
  const urlParams = new URLSearchParams(window.location.search);
  const ssoToken = urlParams.get('token');

  if (ssoToken) {
    // Token save karo
    localStorage.setItem('authToken', ssoToken);
    localStorage.setItem('isLoggedIn', 'true');

    // Token URL se hata do (clean URL)
    window.history.replaceState({}, '', window.location.pathname);

    // Direct dashboard pe bhejo
    router.navigate(['/dashboard']);
    return false;
  }

  // Normal flow
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (isLoggedIn) {
    router.navigate(['/dashboard']);
    return false;
  } else {
    return true;
  }
};