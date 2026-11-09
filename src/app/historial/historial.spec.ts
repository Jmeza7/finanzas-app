import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Historial } from './historial';
import { Movimientos } from '../services/movimientos';

describe('Historial', () => {
  let component: Historial;
  let fixture: ComponentFixture<Historial>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Historial],
    }).compileComponents();

    fixture = TestBed.createComponent(Historial);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('el buscador ignora mayúsculas en el texto buscado', async () => {
    // Preparar (Arrange)
    const movimientosService = TestBed.inject(Movimientos);
    movimientosService.agregarMovimiento({ concepto: 'comida', cantidad: 10, tipo: 'gasto' });
    movimientosService.agregarMovimiento({ concepto: 'nómina', cantidad: 1000, tipo: 'ingreso' });
    // Actuar (Act): se esperan timers reales porque el debounce (300 ms) no
    // se dispara con vi.useFakeTimers() en el entorno zoneless de los tests.
    component.busqueda.set('COMIDA');
    await fixture.whenStable();
    await new Promise((resolve) => setTimeout(resolve, 300));
    // Comprobar (Assert)
    const filtrados = component.movimientosFiltrados();
    expect(filtrados).toHaveLength(1);
    expect(filtrados[0].concepto).toBe('comida');
  });
});
