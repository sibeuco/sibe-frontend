import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const securityGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('Authorization');
  const currentUrl = state.url;

  // Rutas públicas que no requieren autenticación
  const publicRoutes = ['/login', '/recuperar-contrasena'];
  const isPublicRoute = publicRoutes.some(route => currentUrl === route || currentUrl.startsWith(route));

  // 🔹 Si no hay token
  if (!token) {
    // Si está intentando acceder a una ruta pública, permitir
    if (isPublicRoute) {
      return true;
    }
    // Si no es ruta pública, redirigir al login
    router.navigate(['/login']);
    return false;
  }

  // 🔹 Si hay token pero está vencido
  if (token && tokenExpired(token)) {
    sessionStorage.removeItem('Authorization');
    // Si está en una ruta pública, permitir acceso
    if (isPublicRoute) {
      return true;
    }
    // Si no es ruta pública, redirigir al login
    router.navigate(['/login']);
    return false;
  }

  // 🔹 Si hay token válido y el usuario intenta ir a una ruta pública
  if (token && !tokenExpired(token) && isPublicRoute) {
    // Redirigir al home si intenta acceder al login o recuperar contraseña
    router.navigate(['/home']);
    return false;
  }

  // 🔹 Si hay token válido y está accediendo a una ruta protegida
  return true;
};

function tokenExpired(token: string): boolean {
  try {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(Date.now() / 1000) >= expiry;
  } catch {
    // Si falla la decodificación, lo tratamos como expirado
    return true;
  }
}