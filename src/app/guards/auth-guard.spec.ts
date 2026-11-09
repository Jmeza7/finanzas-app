import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { authGuard } from './auth-guard';
import { Auth } from '../auth';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  const route = {} as ActivatedRouteSnapshot;
  const state = {} as RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('sin sesión redirige al login', () => {
    // Preparar (Arrange)
    const router = TestBed.inject(Router);
    // Actuar (Act)
    const resultado = executeGuard(route, state);
    // Comprobar (Assert)
    expect(resultado).toBeInstanceOf(UrlTree);
    expect(router.serializeUrl(resultado as UrlTree)).toBe('/');
  });

  it('con sesión deja pasar', () => {
    // Preparar (Arrange)
    TestBed.inject(Auth).login();
    // Actuar (Act)
    const resultado = executeGuard(route, state);
    // Comprobar (Assert)
    expect(resultado).toBe(true);
  });
});
