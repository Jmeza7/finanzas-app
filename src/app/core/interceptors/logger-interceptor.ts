import { HttpInterceptorFn } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { finalize } from 'rxjs';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  // En producción no se registra nada.
  if (!isDevMode()) {
    return next(req);
  }
  const inicio = Date.now();
  return next(req).pipe(
    finalize(() => {
      console.log('METHOD:', req.method,
        'URL', req.url,
        'Duracion', Date.now() - inicio, 'ms'
      );
    })
  );
}
