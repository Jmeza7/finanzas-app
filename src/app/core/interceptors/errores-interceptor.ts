import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Notificaciones } from '../notificaciones/notificaciones';

export const MENSAJE_SIN_CONEXION = 'No se pudo conectar con el servidor. Comprueba tu conexión.';
export const MENSAJE_ERROR_PETICION = 'No se pudo completar la petición. Inténtalo de nuevo más tarde.';

export const erroresInterceptor: HttpInterceptorFn = (req, next) => {
  const notificaciones = inject(Notificaciones);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      // status 0: la petición no llegó al servidor (sin red, CORS, servidor caído).
      const mensaje = err.status === 0 ? MENSAJE_SIN_CONEXION : MENSAJE_ERROR_PETICION;
      notificaciones.mostrarAvisoError(mensaje);
      return throwError(() => err);
    })
  );

};
