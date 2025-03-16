import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly FAKE_USER = { username: 'admin', password: '1234' }; // Credenciales falsas

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username === this.FAKE_USER.username && password === this.FAKE_USER.password) {
      localStorage.setItem('auth', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('auth');
    this.router.navigate(['/login']); // Redirigir al login después del logout
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('auth') === 'true';
  }
}
