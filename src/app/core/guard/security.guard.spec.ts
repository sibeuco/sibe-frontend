import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { securityGuard } from './security.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('securityGuard', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    sessionStorage.clear();
  });

  function createValidToken(claims: Record<string, any> = {}): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      email: 'test@test.com',
      id: '123',
      authorities: 'USER',
      exp: Math.floor(Date.now() / 1000) + 3600,
      rol: 'COLABORADOR',
      ...claims
    }));
    const signature = 'fake-signature';
    return `${header}.${payload}.${signature}`;
  }

  function executeGuard(url: string): boolean {
    const route = {} as ActivatedRouteSnapshot;
    const state = { url } as RouterStateSnapshot;
    return TestBed.runInInjectionContext(() => securityGuard(route, state)) as boolean;
  }

  it('debería bloquear acceso a gestionar-direccion cuando rol es COLABORADOR', () => {
    const token = createValidToken({ rol: 'COLABORADOR' });
    sessionStorage.setItem('Authorization', token);

    const result = executeGuard('/gestionar-direccion');

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('debería permitir acceso a gestionar-direccion cuando rol es ADMINISTRADOR_DIRECCION', () => {
    const token = createValidToken({ rol: 'ADMINISTRADOR_DIRECCION' });
    sessionStorage.setItem('Authorization', token);

    const result = executeGuard('/gestionar-direccion');

    expect(result).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('debería bloquear acceso a gestionar-usuarios cuando rol es ADMINISTRADOR_AREA', () => {
    const token = createValidToken({ rol: 'ADMINISTRADOR_AREA' });
    sessionStorage.setItem('Authorization', token);

    const result = executeGuard('/gestionar-usuarios');

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('debería permitir acceso a gestionar-indicadores cuando rol es ADMINISTRADOR_AREA', () => {
    const token = createValidToken({ rol: 'ADMINISTRADOR_AREA' });
    sessionStorage.setItem('Authorization', token);

    const result = executeGuard('/gestionar-indicadores');

    expect(result).toBeTrue();
  });

  it('debería permitir acceso a home para todos los roles', () => {
    const token = createValidToken({ rol: 'COLABORADOR' });
    sessionStorage.setItem('Authorization', token);

    const result = executeGuard('/home');

    expect(result).toBeTrue();
  });

  it('debería redirigir al login cuando no hay token', () => {
    const result = executeGuard('/home');

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
