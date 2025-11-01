import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';

import { SpinnerService } from '@services';

export const SpinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const _spinnerService = inject(SpinnerService);
  _spinnerService.show();
  return next(req).pipe(finalize(() => _spinnerService.hide()));
};
