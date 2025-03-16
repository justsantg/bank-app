import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
export class AdminComponent implements OnInit {
  // ✅ Inicializar cliente
  cliente = { nombre: '', email: '', telefono: '' };
  clientes: any[] = []; // ✅ Lista de clientes

  // ✅ Inicializar cuenta
  cuenta = { tipo: '', saldo: 0, clienteId: null };
  cuentas: any[] = []; // ✅ Lista de cuentas

  // ✅ Inicializar movimiento
  movimiento = { monto: 0, tipo: '', cuentaId: null };
  movimientos: any[] = []; // ✅ Lista de movimientos

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private cuentaService: CuentaService,
    private movimientoService: MovimientoService
  ) {}

  ngOnInit(): void {
    this.obtenerClientes();
    this.obtenerCuentas();
    this.obtenerMovimientos();
  }

  // ✅ Obtener clientes
  obtenerClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        console.log('Clientes recibidos:', data);
        this.clientes = data;
      },
      error: (err) => console.error('Error al obtener clientes:', err)
    });
  }

  // ✅ Agregar cliente
  agregarCliente(): void {
    this.clienteService.createCliente(this.cliente).subscribe({
      next: () => {
        alert('Cliente agregado correctamente ✅');
        this.cliente = { nombre: '', email: '', telefono: '' };
        this.obtenerClientes(); // ✅ Actualizar lista
      },
      error: (err) => console.error('Error al agregar cliente:', err)
    });
  }

  // ✅ Eliminar cliente
  eliminarCliente(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este cliente? 🚨')) {
      this.clienteService.deleteCliente(id).subscribe({
        next: () => {
          alert('Cliente eliminado correctamente ✅');
          this.obtenerClientes();
        },
        error: (err) => console.error('Error al eliminar cliente:', err)
      });
    }
  }

  // ✅ Obtener cuentas
  obtenerCuentas(): void {
    this.cuentaService.getCuentas().subscribe({
      next: (data) => {
        this.cuentas = data;
      },
      error: (err) => console.error('Error al obtener cuentas:', err)
    });
  }

  // ✅ Agregar cuenta
  agregarCuenta() {
    if (!this.cuenta.clienteId) {
      alert('⚠️ Debes seleccionar un cliente antes de agregar una cuenta.');
      return;
    }
  
    this.cuentaService.createCuenta(this.cuenta).subscribe({
      next: () => {
        alert('✅ Cuenta agregada correctamente');
        this.cuenta = { tipo: '', saldo: 0, clienteId: null }; // 🔥 Resetear formulario
      },
      error: (err) => console.error('❌ Error al agregar cuenta:', err)
    });
  }
  

  // ✅ Eliminar cuenta
  eliminarCuenta(id: number): void {
    if (confirm('¿Seguro que deseas eliminar esta cuenta? 🚨')) {
      this.cuentaService.deleteCuenta(id).subscribe({
        next: () => {
          alert('Cuenta eliminada correctamente ✅');
          this.obtenerCuentas();
        },
        error: (err) => console.error('Error al eliminar cuenta:', err)
      });
    }
  }

  // ✅ Obtener movimientos
  obtenerMovimientos(): void {
    this.movimientoService.getMovimientos().subscribe({
      next: (data) => {
        this.movimientos = data;
      },
      error: (err) => console.error('Error al obtener movimientos:', err)
    });
  }

  // ✅ Agregar movimiento
  agregarMovimiento(): void {
    this.movimientoService.createMovimiento(this.movimiento).subscribe({
      next: () => {
        alert('Movimiento agregado correctamente ✅');
        this.movimiento = { monto: 0, tipo: '', cuentaId: null };
        this.obtenerMovimientos(); // ✅ Actualizar lista
      },
      error: (err) => console.error('Error al agregar movimiento:', err)
    });
  }

  // ✅ Eliminar movimiento
  eliminarMovimiento(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este movimiento? 🚨')) {
      this.movimientoService.deleteMovimiento(id).subscribe({
        next: () => {
          alert('Movimiento eliminado correctamente ✅');
          this.obtenerMovimientos();
        },
        error: (err) => console.error('Error al eliminar movimiento:', err)
      });
    }
  }

  // ✅ Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}
