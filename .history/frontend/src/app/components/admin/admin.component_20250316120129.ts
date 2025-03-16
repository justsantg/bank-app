import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // ✅ Importar Router
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
    private router: Router, // ✅ Agregar Router para redirigir
    private clienteService: ClienteService,
    private cuentaService: CuentaService,
    private movimientoService: MovimientoService
  ) {}

  ngOnInit(): void {
    this.obtenerClientes(); // ✅ Cargar clientes al iniciar
  }

  obtenerClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        console.log('Clientes recibidos:', data);
        this.clientes = data;
      },
      error: (err) => console.error('Error al obtener clientes:', err)
    });
  }

  agregarCliente(): void {
    this.clienteService.createCliente(this.cliente).subscribe({
      next: () => {
        alert('Cliente agregado correctamente');
        this.cliente = { nombre: '', email: '', telefono: '' };
        this.obtenerClientes(); // ✅ Actualizar lista
      },
      error: (err) => console.error('Error al agregar cliente:', err)
    });
  }

  eliminarCliente(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este cliente? 🚨')) {
      this.clienteService.deleteCliente(id).subscribe({
        next: () => {
          alert('Cliente eliminado correctamente ✅');
          this.obtenerClientes(); // ✅ Actualizar lista
        },
        error: (err) => console.error('Error al eliminar cliente:', err)
      });
    }
  }
  

  // ✅ Método para agregar una cuenta
  agregarCuenta() {
    this.cuentaService.createCuenta(this.cuenta).subscribe({
      next: () => {
        alert('Cuenta agregada correctamente');
        this.cuenta = { tipo: '', saldo: 0, clienteId: null };
        this.cargarCuentas(); // Recargar lista de cuentas
      },
      error: (err) => console.error('Error al agregar cuenta:', err)
    });
  }

  eliminarCuenta(id: number) {
    if (confirm('¿Estás seguro de eliminar esta cuenta?')) {
      this.cuentaService.deleteCuenta(id).subscribe({
        next: () => {
          alert('Cuenta eliminada correctamente');
          this.cargarCuentas(); // Recargar lista de cuentas
        },
        error: (err) => console.error('Error al eliminar cuenta:', err)
      });
    }
  }

  cargarCuentas() {
    this.cuentaService.getCuentas().subscribe({
      next: (data) => {
        this.cuenta = data;
      },
      error: (err) => console.error('Error al obtener cuentas:', err)
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

  // ✅ Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('isLoggedIn'); // ✅ Elimina la sesión
    this.router.navigate(['/login']); // ✅ Redirige al login
  }
}
