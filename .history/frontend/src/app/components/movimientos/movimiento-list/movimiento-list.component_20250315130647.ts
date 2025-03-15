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
 
  obtenerUltimoMovimiento(clienteId: number | null): void {
    if (!clienteId) {
      console.error('❌ Error: clienteId es inválido o null.');
      return; // Evita hacer la petición con un ID inválido
    }
  
    this.movimientoService.getUltimoMovimiento(clienteId).subscribe({
      next: (data) => {
        console.log('✅ Último movimiento recibido:', data);
        this.ultimoMovimiento = data;
        this.mostrarModal = true;
      },
      error: (err) => {
        console.error('❌ Error al obtener el último movimiento:', err);
        this.ultimoMovimiento = null;
      }
    });
  }
  
  

  cerrarModal(): void {
    this.mostrarModal = false;
    this.ultimoMovimiento = null;
  }
}
