import { ActivatedRouteSnapshot, CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import {catchError, map, Observable, of} from 'rxjs';
import {AuthService} from "../services/auth.service";

export const isLoggedInGuard: CanActivateFn = (_route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree   => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getSelf().pipe(
    map((user) => {
      if (user) {
        return true;
      } else {
        return router.parseUrl('/home');
      }
    }),
    catchError(() => {
      router.navigate(['/home']);
      return of()
    })
  );
};
