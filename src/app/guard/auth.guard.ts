import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Verificar si el usuario está autenticado
    const isAuthenticated = this.isAuthenticated();
    if (isAuthenticated) {
      // this.router.navigate(['/product-maintenance']);
      
      return true; // Permitir el acceso a la ruta
    } else {
      // Redirigir al usuario a la página de inicio de sesión
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false; // No permitir el acceso a la ruta
    }
  }

  private isAuthenticated(): boolean {
    // Verificar si hay un token JWT almacenado en el localStorage
    const token = localStorage.getItem('token');
    // Devolver true si hay un token y no está expirado, de lo contrario, devolver false
    // Implementa tu lógica de verificación de token aquí
    return !!token; // Cambiar esto con tu lógica de verificación de token
  }
}
