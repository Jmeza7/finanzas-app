import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { vi } from 'vitest';
import { loggerInterceptor } from './logger-interceptor';

// Los tests se ejecutan en modo desarrollo, así que el logger está activo.
describe('loggerInterceptor', () => {
  const URL = '/api/prueba';
  let http: HttpClient;
  let controlador: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([loggerInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpClient);
    controlador = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controlador.verify();
    vi.restoreAllMocks();
  });

  it('al terminar la petición registra método, URL y duración', () => {
    // Preparar (Arrange)
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    http.get(URL).subscribe();
    // Actuar (Act)
    controlador.expectOne(URL).flush({});
    // Comprobar (Assert)
    expect(log).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenCalledWith('METHOD:', 'GET', 'URL', URL, 'Duracion', expect.any(Number), 'ms');
  });

  it('también registra la petición cuando falla', () => {
    // Preparar (Arrange)
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    http.post(URL, {}).subscribe({ error: () => {} });
    // Actuar (Act)
    controlador.expectOne(URL).flush('fallo', { status: 500, statusText: 'Server Error' });
    // Comprobar (Assert)
    expect(log).toHaveBeenCalledWith('METHOD:', 'POST', 'URL', URL, 'Duracion', expect.any(Number), 'ms');
  });
});
