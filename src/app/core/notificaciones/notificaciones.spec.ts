import { TestBed } from '@angular/core/testing';
import { Notificaciones } from './notificaciones';

describe('Notificaciones', () => {
  let service: Notificaciones;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Notificaciones);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('mostrarAvisoError guarda el texto y cerrar lo quita', () => {
    // Preparar (Arrange)
    service.mostrarAvisoError('Algo ha fallado');
    const conAviso = service.notificaciones();
    // Actuar (Act)
    service.cerrar();
    // Comprobar (Assert)
    expect(conAviso).toBe('Algo ha fallado');
    expect(service.notificaciones()).toBeNull();
  });
});
