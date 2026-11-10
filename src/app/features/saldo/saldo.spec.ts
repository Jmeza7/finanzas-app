import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Saldo } from './saldo';

describe('Saldo', () => {
  let component: Saldo;
  let fixture: ComponentFixture<Saldo>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Saldo],
    }).compileComponents();

    fixture = TestBed.createComponent(Saldo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('tras añadir, vacía el formulario sin mostrar errores de validación', async () => {
    // Preparar (Arrange)
    component.nuevoMovimiento.set({ concepto: 'Nómina', cantidad: 2500, tipo: 'ingreso' });
    component.movimientoForm.concepto().markAsTouched();
    component.movimientoForm.cantidad().markAsTouched();
    await fixture.whenStable();
    // Actuar (Act)
    component.agregar();
    await fixture.whenStable();
    // Comprobar (Assert)
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.nuevoMovimiento()).toEqual(component.cleanMovimiento);
    expect(component.movimientoForm.concepto().touched()).toBe(false);
    expect(component.movimientoForm.cantidad().touched()).toBe(false);
    expect(compiled.querySelectorAll('.campo__error')).toHaveLength(0);
  });
});
