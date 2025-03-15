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
    this.cargarCuentas();
  }

  // 🔥 Obtener la lista de cuentas
  private cargarCuentas(): void {
    this.cuentaService.getCuentas().subscribe({
      next: (data) => {
        console.log('✅ Cuentas recibidas:', data);
        this.cuentas = data;
      },
      error: (err) => {
        console.error('❌ Error al obtener cuentas:', err);
      }
    });
  }

  // 🔥 Método para ver detalles y obtener el último movimiento
  verDetalles(cuenta: any): void {
    this.cuentaSeleccionada = cuenta;
    this.mostrarModal = true;

    if (!cuenta.id) {
      console.error('❌ Error: La cuenta seleccionada no tiene un ID válido.');
      return;
    }

    this.obtenerUltimoMovimiento(cuenta.id);
  }

  // ✅ Método separado para obtener el último movimiento de la cuenta
  obtenerUltimoMovimiento(cuentaId: number | null): void {
    if (!cuentaId) {
      console.error('❌ Error: cuentaId es inválido o null.');
      return; // Evita hacer la petición con un ID inválido
    }
  
    this.movimientoService.getUltimoMovimiento(cuentaId).subscribe({
      next: (data) => {
        console.log('✅ Último movimiento recibido:', data);
        this.ultimoMovimiento = data;
      },
      error: (err) => {
        console.error('❌ Error al obtener el último movimiento:', err);
        this.ultimoMovimiento = null;
      }
    });
  }
  

  // 🔥 Método para cerrar el modal
  cerrarModal(): void {
    this.mostrarModal = false;
    this.cuentaSeleccionada = null;
    this.ultimoMovimiento = null;
  }
}
