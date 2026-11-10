import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  const time = Date.now();
  return next(req).pipe(
    finalize(() => {
      console.log('METHOD:', req.method,
        'URL', req.url,
        'Duracion', Date.now() - time, 'ms'
      );
    })
  );
}
