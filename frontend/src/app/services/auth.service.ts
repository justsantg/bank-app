import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarioAutenticado = false;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // Usuario y contraseña falsos
    if (username === 'admin' && password === '1234') {
      this.usuarioAutenticado = true;
      localStorage.setItem('auth', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    this.usuarioAutenticado = false;
    localStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('auth') === 'true';
  }
}
