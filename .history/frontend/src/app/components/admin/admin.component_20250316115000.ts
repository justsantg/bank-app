import { Component, OnInit } from '@angular/core';
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
export class AdminComponent implements OnInit {
  // ✅ Formulario de cliente
  cliente = { nombre: '', email: '', telefono: '' };
  clientes: any[] = []; // ✅ Lista de clientes

  constructor(
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
}
