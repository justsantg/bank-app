import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { CuentaService } from '../../services/cuenta.service';
import { MovimientoService } from '../../services/movimiento.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  nuevoCliente = { nombre: '', email: '', telefono: '' };
  nuevaCuenta = { tipo: '', saldo: '', clienteId: null };
  nuevoMovimiento = { monto: '', tipo: '', cuentaId: null };

  constructor(
    private clienteService: ClienteService,
    private cuentaService: CuentaService,
    private movimientoService: MovimientoService
  ) {}

  agregarCliente() {
    this.clienteService.createCliente(this.nuevoCliente).subscribe({
      next: (res) => {
        console.log('Cliente agregado:', res);
        alert('Cliente agregado exitosamente');
        this.nuevoCliente = { nombre: '', email: '', telefono: '' };
      },
      error: (err) => console.error('Error al agregar cliente:', err)
    });
  }

  agregarCuenta() {
    this.cuentaService.createCuenta(this.nuevaCuenta).subscribe({
      next: (res) => {
        console.log('Cuenta agregada:', res);
        alert('Cuenta agregada exitosamente');
        this.nuevaCuenta = { tipo: '', saldo: '', clienteId: null };
      },
      error: (err) => console.error('Error al agregar cuenta:', err)
    });
  }

  agregarMovimiento() {
    this.movimientoService.createMovimiento(this.nuevoMovimiento).subscribe({
      next: (res) => {
        console.log('Movimiento agregado:', res);
        alert('Movimiento agregado exitosamente');
        this.nuevoMovimiento = { monto: '', tipo: '', cuentaId: null };
      },
      error: (err) => console.error('Error al agregar movimiento:', err)
    });
  }
}
