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
        // Asegurar que cada movimiento tiene su cuenta y cliente asociado
        this.movimientos = data.map(mov => ({
          ...mov,
          cuenta: mov.cuenta ?? { id: null, tipo: 'Desconocido', saldo: 0, cliente: { nombre: 'No disponible' } }
        }));
      },
      error: (err) => {
        console.error('Error al obtener movimientos:', err);
      }
    });
  }

  // ✅ Método para obtener los detalles del movimiento
  obtenerUltimoMovimiento(movimiento: any): void {
    if (!movimiento.cuenta || !movimiento.cuenta.id) {
      console.error('No se puede obtener el último movimiento porque la cuenta es null o no tiene ID.');
      return;
    }
  
    this.movimientoService.getUltimoMovimiento(movimiento.cuenta.id).subscribe({
      next: (data) => {
        console.log('Último movimiento recibido:', data);
        this.ultimoMovimiento = {
          ...data,
          cuenta: data.cuenta ?? { id: null, tipo: 'Desconocido', saldo: 0, cliente: { nombre: 'No disponible' } }
        };
        this.mostrarModal = true;
      },
      error: (err) => {
        console.error('Error al obtener el último movimiento:', err);
      }
    });
  }
}
