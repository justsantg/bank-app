import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  cliente = { nombre: '', email: '', telefono: '' };
  cuenta = { tipo: '', saldo: 0 };
  movimiento = { monto: 0, tipo: '' };

  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
  }

  agregarCliente() {
    console.log('Cliente agregado:', this.cliente);
  }

  agregarCuenta() {
    console.log('Cuenta agregada:', this.cuenta);
  }

  agregarMovimiento() {
    console.log('Movimiento agregado:', this.movimiento);
  }
}
