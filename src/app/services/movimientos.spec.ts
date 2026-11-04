import { TestBed } from '@angular/core/testing';
import { Movimientos } from './movimientos';
import { Movimiento } from '../movimiento';

describe('Movimientos', () => {
  let service: Movimientos;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(Movimientos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('sin movimientos saldo 0', () => {
    // Preparar (Arrange)
    // Actuar (Act)
    // Comprobar (Assert)
    expect(service.movimientos()).toHaveLength(0);
    expect(service.saldo()).toBe(0);
  });

  it('ingreso 100 saldo 100', () => {
    // Preparar (Arrange)
    const testIngreso: Omit<Movimiento, 'id'>  = {
      'cantidad' : 100,
      'tipo': 'ingreso',
      'concepto': 'test'
    }
    // Actuar (Act)
    service.agregarMovimiento(testIngreso);
    // Comprobar (Assert)
    expect(service.saldo()).toBe(100);
  });

  
  it('ingreso 100 egreso 30 saldo 70 estado positivo', () => {
    // Preparar (Arrange)
    const testIngreso2: Omit<Movimiento, 'id'>  = {
      'cantidad' : 100,
      'tipo': 'ingreso',
      'concepto': 'test'
    }
    const testGasto: Omit<Movimiento, 'id'>  = {
      'cantidad' : 30,
      'tipo': 'gasto',
      'concepto': 'test2'
    }
    // Actuar (Act)
    service.agregarMovimiento(testIngreso2);
    service.agregarMovimiento(testGasto);
    // Comprobar (Assert)
    expect(service.saldo()).toBe(70);
    expect(service.estado()).toBe('En positivo');
  });

    it('Eliminar movimiento', () => {
    // Preparar (Arrange)
    const testIngreso2: Omit<Movimiento, 'id'>  = {
      'cantidad' : 100,
      'tipo': 'ingreso',
      'concepto': 'test'
    }
    const testGasto: Omit<Movimiento, 'id'>  = {
      'cantidad' : 30,
      'tipo': 'gasto',
      'concepto': 'test2'
    }
    // Actuar (Act)
    service.agregarMovimiento(testIngreso2);
    service.agregarMovimiento(testGasto);
    // Actuar (Act)
    service.borrarMovimiento(service.movimientos()[0].id);
    // Comprobar (Assert)
    expect(service.movimientos()).toHaveLength(1);
  });

});
