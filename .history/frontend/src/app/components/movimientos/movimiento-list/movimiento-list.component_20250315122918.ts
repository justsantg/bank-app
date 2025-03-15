import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Importar FormsModule
import { MovimientoService } from '../../../services/movimiento.service';

@Component({
  selector: 'app-movimiento-list',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Añadir FormsModule aquí
  templateUrl: './movimiento-list.component.html',
  styleUrls: ['./movimiento-list.component.css']
})
export class MovimientoListComponent implements OnInit {
  movimientos: any[] = [];
  movimientoSeleccionado: any = null;
  mostrarModal: boolean = false;

  filtroTipo: string = '';
  filtroFechaInicio: string = '';
  filtroFechaFin: string = '';

  constructor(private movimientoService: MovimientoService) {}

  ngOnInit(): void {
    this.obtenerMovimientos();
  }

  obtenerMovimientos(): void {
    this.movimientoService.getMovimientos().subscribe({
      next: (data) => {
        console.log('Movimientos recibidos:', data);
        this.movimientos = data;
      },
      error: (err) => {
        console.error('Error al obtener movimientos:', err);
      }
    });
  }

  filtrarMovimientos(): void {
    this.movimientoService.getMovimientosConFiltros(this.filtroTipo, this.filtroFechaInicio, this.filtroFechaFin).subscribe({
      next: (data) => {
        console.log('Movimientos filtrados:', data);
        this.movimientos = data;
      },
      error: (err) => {
        console.error('Error al filtrar movimientos:', err);
      }
    });
  }

  verDetalles(movimiento: any): void {
    this.movimientoSeleccionado = movimiento;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.movimientoSeleccionado = null;
  }
}
