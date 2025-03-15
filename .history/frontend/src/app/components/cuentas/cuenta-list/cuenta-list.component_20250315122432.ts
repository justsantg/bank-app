import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuentaService } from '../../../services/cuenta.service';
import { MovimientoService } from '../../../services/movimiento.service';

@Component({
  selector: 'app-cuenta-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cuenta-list.component.html',
  styleUrls: ['./cuenta-list.component.css']
})
export class CuentaListComponent implements OnInit {
  cuentas: any[] = [];
  cuentaSeleccionada: any = null;
  ultimoMovimiento: any = null;
  mostrarModal: boolean = false;

  constructor(
    private cuentaService: CuentaService,
    private movimientoService: MovimientoService
  ) {}

  ngOnInit(): void {
    this.cuentaService.getCuentas().subscribe({
      next: (data) => {
        console.log('Cuentas recibidas:', data);
        this.cuentas = data;
      },
      error: (err) => {
        console.error('Error al obtener cuentas:', err);
      }
    });
  }

  // 🔥 Método para ver detalles y último movimiento
  verDetalles(cuenta: any): void {
    this.cuentaSeleccionada = cuenta;
    this.mostrarModal = true;

    // Obtener el último movimiento
    this.movimientoService.getUltimoMovimiento(cuenta.id).subscribe({
      next: (data) => {
        console.log('Último movimiento:', data);
        this.ultimoMovimiento = data;
      },
      error: (err) => {
        console.error('Error al obtener el último movimiento:', err);
        this.ultimoMovimiento = null;
      }
    });
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.cuentaSeleccionada = null;
    this.ultimoMovimiento = null;
  }
}
