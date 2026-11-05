import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Notificaciones } from '../notificaciones';

export const erroresInterceptor: HttpInterceptorFn = (req, next) => {
  const notificaciones = inject(Notificaciones);
  return next(req).pipe(
    catchError((err) => {
      notificaciones.mostrarAvisoError('No se pudo cargar el tipo de cambio');
      return throwError(() => err);
    })
  );

};
