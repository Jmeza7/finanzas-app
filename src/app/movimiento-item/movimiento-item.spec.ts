import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { MovimientoItem } from './movimiento-item';
import { Movimiento } from '../movimiento';

describe('MovimientoItem', () => {
  let fixture: ComponentFixture<MovimientoItem>;

  const movimientoPrueba: Movimiento = {
    id: 'abc-123',
    concepto: 'Café',
    cantidad: 3,
    tipo: 'gasto',
  };

  const otroMovimientoPrueba: Movimiento = {
    id: 'abc-123',
    concepto: 'Nomina',
    cantidad: 500,
    tipo: 'ingreso',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [MovimientoItem] });
    fixture = TestBed.createComponent(MovimientoItem);
    fixture.componentRef.setInput('movimiento', movimientoPrueba);
    fixture.detectChanges();
  });

  it('muestra el concepto y la cantidad del movimiento', () => {

    // Actuar: buscar el <p> en el HTML del componente
    const parrafo: HTMLElement = fixture.nativeElement.querySelector('p');

    // Comprobar: que su texto contiene lo que esperamos
    expect(parrafo.textContent).toContain('Café');
    expect(parrafo.textContent).toContain('3');
  });

  it('mismo patron ejemplo', () => {
    fixture.componentRef.setInput('movimiento', otroMovimientoPrueba);
    fixture.detectChanges();
    // Actuar: buscar el <p> en el HTML del componente
    const movimiento: HTMLElement = fixture.nativeElement.querySelector('p');

    // Comprobar: que su texto contiene lo que esperamos
    expect(movimiento.textContent).toContain('Nomina');
    expect(movimiento.textContent).not.toContain('Café');
  });

  it('pulsar boton ', () => {
    const button: HTMLElement = fixture.nativeElement.querySelector('button');
    const spy = vi.fn();
    fixture.componentInstance.eliminar.subscribe(spy);
    button.click();
    expect(spy).toHaveBeenCalledWith('abc-123');
  });
});