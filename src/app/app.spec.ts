import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { Auth } from './core/auth/auth';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('sin sesión muestra el enlace de login', async () => {
    // Preparar (Arrange)
    const fixture = TestBed.createComponent(App);
    // Actuar (Act)
    await fixture.whenStable();
    // Comprobar (Assert)
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Login');
    expect(compiled.textContent).not.toContain('Salir');
  });

  it('con sesión muestra el botón de salir', async () => {
    // Preparar (Arrange)
    TestBed.inject(Auth).login();
    const fixture = TestBed.createComponent(App);
    // Actuar (Act)
    await fixture.whenStable();
    // Comprobar (Assert)
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.barra__sesion button')?.textContent).toContain('Salir');
  });

  it('el botón de menú abre el sidebar y la tecla Escape lo cierra', async () => {
    // Preparar (Arrange)
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const sidebar = compiled.querySelector('app-sidebar')!;
    // Actuar (Act)
    compiled.querySelector<HTMLButtonElement>('.barra__menu')!.click();
    await fixture.whenStable();
    const abiertoTrasPulsar = sidebar.classList.contains('abierto-movil');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await fixture.whenStable();
    // Comprobar (Assert)
    expect(abiertoTrasPulsar).toBe(true);
    expect(sidebar.classList).not.toContain('abierto-movil');
  });

  it('el botón de plegar alterna el sidebar plegado', async () => {
    // Preparar (Arrange)
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    // Actuar (Act)
    compiled.querySelector<HTMLButtonElement>('.sidebar__plegar')!.click();
    await fixture.whenStable();
    // Comprobar (Assert)
    expect(fixture.componentInstance.sidebarPlegado()).toBe(true);
    expect(compiled.querySelector('app-sidebar')!.classList).toContain('plegado');
  });
});
