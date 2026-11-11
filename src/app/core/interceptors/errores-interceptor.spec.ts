import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { vi } from 'vitest';
import { erroresInterceptor, MENSAJE_ERROR_PETICION, MENSAJE_SIN_CONEXION } from './errores-interceptor';
import { Notificaciones } from '../notificaciones/notificaciones';

describe('erroresInterceptor', () => {
  const URL = '/api/prueba';
  let http: HttpClient;
  let controlador: HttpTestingController;
  let notificaciones: Notificaciones;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([erroresInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpClient);
    controlador = TestBed.inject(HttpTestingController);
    notificaciones = TestBed.inject(Notificaciones);
  });

  afterEach(() => {
    controlador.verify();
  });

  it('si la petición va bien no muestra ningún aviso', () => {
    // Preparar (Arrange)
    const alResponder = vi.fn();
    http.get(URL).subscribe(alResponder);
    // Actuar (Act)
    controlador.expectOne(URL).flush({ ok: true });
    // Comprobar (Assert)
    expect(alResponder).toHaveBeenCalledWith({ ok: true });
    expect(notificaciones.notificaciones()).toBeNull();
  });

  it('si el servidor devuelve un error muestra el aviso genérico', () => {
    // Preparar (Arrange)
    http.get(URL).subscribe({ error: () => {} });
    // Actuar (Act)
    controlador.expectOne(URL).flush('fallo', { status: 500, statusText: 'Server Error' });
    // Comprobar (Assert)
    expect(notificaciones.notificaciones()).toBe(MENSAJE_ERROR_PETICION);
  });

  it('si no hay conexión muestra el aviso de conexión', () => {
    // Preparar (Arrange)
    http.get(URL).subscribe({ error: () => {} });
    // Actuar (Act)
    controlador.expectOne(URL).error(new ProgressEvent('error'));
    // Comprobar (Assert)
    expect(notificaciones.notificaciones()).toBe(MENSAJE_SIN_CONEXION);
  });

  it('relanza el error para que lo reciba quien hizo la petición', () => {
    // Preparar (Arrange)
    const alFallar = vi.fn();
    http.get(URL).subscribe({ error: alFallar });
    // Actuar (Act)
    controlador.expectOne(URL).flush('no encontrado', { status: 404, statusText: 'Not Found' });
    // Comprobar (Assert)
    expect(alFallar).toHaveBeenCalledTimes(1);
    const error: HttpErrorResponse = alFallar.mock.calls[0][0];
    expect(error).toBeInstanceOf(HttpErrorResponse);
    expect(error.status).toBe(404);
  });
});
