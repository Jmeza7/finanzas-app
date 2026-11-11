import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { vi } from 'vitest';
import { Saldo } from './saldo';
import { Movimientos } from '../../shared/services/movimientos';

describe('Saldo', () => {
  let component: Saldo;
  let fixture: ComponentFixture<Saldo>;
  let compiled: HTMLElement;

  // --- Ayudantes: interactúan con la plantilla igual que un usuario ---

  const campo = <T extends HTMLElement>(selector: string): T =>
    compiled.querySelector<T>(selector)!;

  const botonAñadir = (): HTMLButtonElement =>
    campo<HTMLButtonElement>('.saldo__acciones button');

  const mensajesError = (): string[] =>
    Array.from(compiled.querySelectorAll('.campo__error')).map((e) => e.textContent!.trim());

  async function escribir(selector: string, valor: string) {
    const el = campo<HTMLInputElement | HTMLSelectElement>(selector);
    el.value = valor;
    el.dispatchEvent(new Event('input'));
    el.dispatchEvent(new Event('change'));
    await fixture.whenStable();
  }

  async function tocar(selector: string) {
    campo(selector).dispatchEvent(new Event('blur'));
    await fixture.whenStable();
  }

  async function rellenar(concepto: string, cantidad: string, tipo: 'ingreso' | 'gasto' = 'ingreso') {
    await escribir('#concepto', concepto);
    await tocar('#concepto');
    await escribir('#cantidad', cantidad);
    await tocar('#cantidad');
    await escribir('#tipo', tipo);
  }

  async function pulsarAñadir() {
    botonAñadir().click();
    await fixture.whenStable();
  }

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Saldo],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Saldo);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    // Responder a la petición del tipo de cambio para que el componente quede estable.
    TestBed.tick();
    TestBed.inject(HttpTestingController)
      .expectOne('https://api.frankfurter.dev/v2/rate/eur/usd')
      .flush({ date: '2026-11-11', base: 'EUR', quote: 'USD', rate: 1.1 });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('validaciones del formulario', () => {
    it('al abrir la pantalla el formulario es inválido', () => {
      // Preparar (Arrange)
      // Actuar (Act)
      const invalido = component.movimientoForm().invalid();
      // Comprobar (Assert)
      expect(invalido).toBe(true);
    });

    it('con el concepto vacío da el error de concepto obligatorio', async () => {
      // Preparar (Arrange)
      await escribir('#cantidad', '10');
      // Actuar (Act)
      await escribir('#concepto', '');
      // Comprobar (Assert)
      const errores = component.movimientoForm.concepto().errors().map((e) => e.message);
      expect(errores).toEqual(['El concepto es obligatorio']);
    });

    it('con cantidad 0 da el error de cantidad mínima', async () => {
      // Preparar (Arrange)
      await escribir('#concepto', 'Café');
      // Actuar (Act)
      await escribir('#cantidad', '0');
      // Comprobar (Assert)
      const errores = component.movimientoForm.cantidad().errors().map((e) => e.message);
      expect(errores).toEqual(['La cantidad tiene que ser mayor a 0']);
    });

    it('el mínimo de cantidad es 0,5: 0,4 da error y 0,5 no', async () => {
      // Preparar (Arrange)
      await escribir('#concepto', 'Café');
      // Actuar (Act)
      await escribir('#cantidad', '0.4');
      const invalidoCon04 = component.movimientoForm.cantidad().invalid();
      await escribir('#cantidad', '0.5');
      const invalidoCon05 = component.movimientoForm.cantidad().invalid();
      // Comprobar (Assert)
      expect(invalidoCon04).toBe(true);
      expect(invalidoCon05).toBe(false);
    });

    it('con concepto y cantidad válidos el formulario es válido', async () => {
      // Preparar (Arrange)
      // Actuar (Act)
      await rellenar('Nómina', '2500');
      // Comprobar (Assert)
      expect(component.movimientoForm().valid()).toBe(true);
      expect(mensajesError()).toEqual([]);
    });

    it('los errores solo se muestran después de tocar el campo', async () => {
      // Preparar (Arrange)
      await escribir('#concepto', '');
      const erroresSinTocar = mensajesError();
      // Actuar (Act)
      await tocar('#concepto');
      // Comprobar (Assert)
      expect(erroresSinTocar).toEqual([]);
      expect(mensajesError()).toEqual(['El concepto es obligatorio']);
    });
  });

  describe('botón Añadir movimiento', () => {
    it('está desactivado cuando el formulario es inválido', () => {
      // Preparar (Arrange)
      // Actuar (Act)
      const boton = botonAñadir();
      // Comprobar (Assert)
      expect(boton.disabled).toBe(true);
    });

    it('se activa al rellenar el formulario con datos válidos', async () => {
      // Preparar (Arrange)
      // Actuar (Act)
      await rellenar('Nómina', '2500');
      // Comprobar (Assert)
      expect(botonAñadir().disabled).toBe(false);
    });
  });

  describe('al añadir', () => {
    it('llama al servicio una vez con los datos del formulario', async () => {
      // Preparar (Arrange)
      const spy = vi.spyOn(TestBed.inject(Movimientos), 'agregarMovimiento');
      await rellenar('Nómina', '2500');
      // Actuar (Act)
      await pulsarAñadir();
      // Comprobar (Assert)
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ concepto: 'Nómina', cantidad: 2500, tipo: 'ingreso' });
    });

    it('envía el tipo gasto si se elige en el select', async () => {
      // Preparar (Arrange)
      const spy = vi.spyOn(TestBed.inject(Movimientos), 'agregarMovimiento');
      await rellenar('Alquiler', '850', 'gasto');
      // Actuar (Act)
      await pulsarAñadir();
      // Comprobar (Assert)
      expect(spy).toHaveBeenCalledWith({ concepto: 'Alquiler', cantidad: 850, tipo: 'gasto' });
    });

    it('no llama al servicio si el formulario es inválido', async () => {
      // Preparar (Arrange)
      const spy = vi.spyOn(TestBed.inject(Movimientos), 'agregarMovimiento');
      await rellenar('', '0');
      // Actuar (Act)
      await pulsarAñadir();
      // Comprobar (Assert)
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('después de añadir', () => {
    it('vacía el formulario sin campos tocados ni mensajes de error', async () => {
      // Preparar (Arrange)
      await rellenar('Nómina', '2500');
      // Actuar (Act)
      await pulsarAñadir();
      // Comprobar (Assert)
      expect(component.nuevoMovimiento()).toEqual(component.cleanMovimiento);
      expect(campo<HTMLInputElement>('#concepto').value).toBe('');
      expect(component.movimientoForm.concepto().touched()).toBe(false);
      expect(component.movimientoForm.cantidad().touched()).toBe(false);
      expect(mensajesError()).toEqual([]);
    });

    it('permite añadir un segundo movimiento seguido', async () => {
      // Preparar (Arrange)
      const spy = vi.spyOn(TestBed.inject(Movimientos), 'agregarMovimiento');
      await rellenar('Nómina', '2500');
      await pulsarAñadir();
      // Actuar (Act)
      await rellenar('Alquiler', '850', 'gasto');
      await pulsarAñadir();
      // Comprobar (Assert)
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenLastCalledWith({ concepto: 'Alquiler', cantidad: 850, tipo: 'gasto' });
    });
  });
});
