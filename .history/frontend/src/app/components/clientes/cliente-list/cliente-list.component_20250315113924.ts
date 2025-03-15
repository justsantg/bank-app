import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { MovimientoService } from 'src/app/services/movimiento.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  clientes: any[] = [];
  ultimoMovimiento: any = null; // Aquí guardaremos el último movimiento
  mostrarModal: boolean = false; // Controla si el modal está visible

  constructor(
    private clienteService: ClienteService,
    private movimientoService: MovimientoService
  ) {}

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        console.log('Clientes recibidos:', data);
        this.clientes = data;
      },
      error: (err) => {
        console.error('Error al obtener clientes:', err);
      }
    });
  }

  // 🔥 Método para obtener el último movimiento de un cliente
  obtenerUltimoMovimiento(clienteId: number): void {
    this.movimientoService.getUltimoMovimiento(clienteId).subscribe({
      next: (data) => {
        console.log('Último movimiento:', data);
        this.ultimoMovimiento = data;
        this.mostrarModal = true; // Muestra el modal
      },
      error: (err) => {
        console.error('Error al obtener el último movimiento:', err);
      }
    });
  }

  // 🔥 Método para cerrar el modal
  cerrarModal(): void {
    this.mostrarModal = false;
    this.ultimoMovimiento = null;
  }
}
