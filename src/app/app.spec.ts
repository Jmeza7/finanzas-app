import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { Auth } from './auth';

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
    expect(compiled.querySelector('button')?.textContent).toContain('Salir');
  });
});
