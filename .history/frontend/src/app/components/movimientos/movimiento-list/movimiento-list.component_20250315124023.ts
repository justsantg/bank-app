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
  movimientos: any[] = []; // 🔥 Asegura que es un array

  constructor(private movimientoService: MovimientoService) {}

  ngOnInit(): void {
    this.movimientoService.getMovimientos().subscribe({
      next: (data) => {
        console.log('Movimientos recibidos:', data);
        this.movimientos = data; // 🔥 Asegúrate de asignar correctamente los movimientos
      },
      error: (err) => {
        console.error('Error al obtener movimientos:', err);
      }
    });
  }
}

  // ✅ Método para obtener el último movimiento de una cuenta específica
  obtenerUltimoMovimiento(cuentaId: number): void {
    this.movimientoService.getUltimoMovimiento(cuentaId).subscribe({
      next: (data) => {
        console.log('Último movimiento recibido:', data);
        this.ultimoMovimiento = data;
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
