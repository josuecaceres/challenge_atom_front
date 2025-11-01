import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { DataService } from '@services';

export const ErrorResponseInterceptor: HttpInterceptorFn = (req, next) => {
  const _dataServ = inject(DataService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorResponse = `Error code :${error.status}, message: ${error.error.message}`;
      _dataServ.showMessage('error', 'Error', error.error.message);
      return throwError(() => errorResponse);
    })
  );
};
