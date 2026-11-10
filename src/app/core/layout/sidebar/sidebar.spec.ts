import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { Sidebar } from './sidebar';

describe('Sidebar', () => {
  let fixture: ComponentFixture<Sidebar>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidebar],
      providers: [
        provideRouter([
          { path: 'saldo', children: [] },
          { path: 'historial', children: [] },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Sidebar);
    host = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('muestra los enlaces de Saldo e Historial', () => {
    // Preparar (Arrange)
    // Actuar (Act)
    const enlaces = Array.from(host.querySelectorAll('a')).map((a) => a.textContent?.trim());
    // Comprobar (Assert)
    expect(enlaces).toEqual(['Saldo', 'Historial']);
  });

  it('aplica las clases según los inputs', async () => {
    // Preparar (Arrange)
    fixture.componentRef.setInput('abiertoMovil', true);
    fixture.componentRef.setInput('plegado', true);
    // Actuar (Act)
    await fixture.whenStable();
    // Comprobar (Assert)
    expect(host.classList).toContain('abierto-movil');
    expect(host.classList).toContain('plegado');
  });

  it('emite cerrar al pulsar un enlace', async () => {
    // Preparar (Arrange)
    const spy = vi.fn();
    fixture.componentInstance.cerrar.subscribe(spy);
    // Actuar (Act)
    host.querySelector('a')!.click();
    await fixture.whenStable();
    // Comprobar (Assert)
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('emite alternarPlegado al pulsar el botón de plegar', () => {
    // Preparar (Arrange)
    const spy = vi.fn();
    fixture.componentInstance.alternarPlegado.subscribe(spy);
    // Actuar (Act)
    host.querySelector<HTMLButtonElement>('.sidebar__plegar')!.click();
    // Comprobar (Assert)
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
