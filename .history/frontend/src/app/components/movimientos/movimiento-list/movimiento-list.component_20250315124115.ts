import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovimientoService } from '../../../services/movimiento.service';

@Component({
  selector: 'app-movimiento-list',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importar FormsModule para usar ngModel
  templateUrl: './movimiento-list.component.html',
  styleUrls: ['./movimiento-list.component.css']
})
export class MovimientoListComponent implements OnInit {
  movimientos: any[] = [];
  ultimoMovimiento: any = null;
  mostrarModal: boolean = false;

  constructor(private movimientoService: MovimientoService) {}

  ngOnInit(): void {
    this.obtenerMovimientos();
  }

  obtenerMovimientos(): void {
    this.movimientoService.getMovimientos().subscribe({
      next: (data) => {
        console.log('Movimientos recibidos:', data);
        // 🔥 Asegurar que cada movimiento tiene su cuenta y cliente asociado
        this.movimientos = data.map(mov => ({
          ...mov,
          cuenta: mov.cuenta || { tipo: 'Desconocido', saldo: 0, cliente: { nombre: 'No disponible' } }
        }));
      },
      error: (err) => {
        console.error('Error al obtener movimientos:', err);
      }
    });
  }

  // ✅ Método para obtener el último movimiento con cliente y cuenta
  obtenerUltimoMovimiento(cuentaId: number): void {
    this.movimientoService.getUltimoMovimiento(cuentaId).subscribe({
      next: (data) => {
        console.log('Último movimiento recibido:', data);
        this.ultimoMovimiento = {
          ...data,
          cuenta: data.cuenta || { tipo: 'Desconocido', cliente: { nombre: 'No disponible' } }
        };
        this.mostrarModal = true;
      },
      error: (err) => {
        console.error('Error al obtener el último movimiento:', err);
      }
    });
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.ultimoMovimiento = null;
  }
}
