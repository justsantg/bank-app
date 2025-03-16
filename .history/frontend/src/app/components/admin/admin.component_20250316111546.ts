import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { CuentaService } from '../../services/cuenta.service';
import { MovimientoService } from '../../services/movimiento.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Agregar FormsModule
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})


export class AdminComponent {
  // ✅ Inicializar cliente
  cliente = { nombre: '', email: '', telefono: '' };

  // ✅ Inicializar cuenta
  cuenta = { tipo: '', saldo: 0, clienteId: null };

  // ✅ Inicializar movimiento
  movimiento = { monto: 0, tipo: '', cuentaId: null };

  constructor(
    private clienteService: ClienteService,
    private cuentaService: CuentaService,
    private movimientoService: MovimientoService
  ) {}

  // ✅ Método para agregar un cliente
  agregarCliente() {
    this.clienteService.createCliente(this.cliente).subscribe({
      next: () => {
        alert('Cliente agregado correctamente');
        this.cliente = { nombre: '', email: '', telefono: '' };
      },
      error: (err) => console.error('Error al agregar cliente:', err)
    });
  }

  // ✅ Método para agregar una cuenta
  agregarCuenta() {
    this.cuentaService.createCuenta(this.cuenta).subscribe({
      next: () => {
        alert('Cuenta agregada correctamente');
        this.cuenta = { tipo: '', saldo: 0, clienteId: null };
      },
      error: (err) => console.error('Error al agregar cuenta:', err)
    });
  }

  // ✅ Método para agregar un movimiento
  agregarMovimiento() {
    this.movimientoService.createMovimiento(this.movimiento).subscribe({
      next: () => {
        alert('Movimiento agregado correctamente');
        this.movimiento = { monto: 0, tipo: '', cuentaId: null };
      },
      error: (err) => console.error('Error al agregar movimiento:', err)
    });
  }
  
}

