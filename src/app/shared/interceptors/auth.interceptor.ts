import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '@services';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authServ = inject(AuthService);

  const excludedRoutes = ['/login', '/register'];
  const isExcluded = excludedRoutes.some((route) => req.url.includes(route));

  if (isExcluded) {
    return next(req);
  }

  const currentToken = authServ.currentToken();
  const headers = req.headers
    .set('Authorization', `Bearer ${currentToken}`)
    .set('Accept-Language', 'es');

  const clonedRequest = req.clone({ headers });

  return next(clonedRequest);
};
