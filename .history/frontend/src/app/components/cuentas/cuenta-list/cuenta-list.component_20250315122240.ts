import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importar RouterModule
import { CuentaService } from '../../../services/cuenta.service';

@Component({
  selector: 'app-cuenta-list',
  standalone: true,
  imports: [CommonModule, RouterModule], // Agregar RouterModule
  templateUrl: './cuenta-list.component.html',
  styleUrls: ['./cuenta-list.component.css']
})
export class CuentaListComponent implements OnInit {
  cuentas: any[] = [];

  constructor(private cuentaService: CuentaService) {}

  ngOnInit(): void {
    this.cuentaService.getCuentas().subscribe({
      next: (data) => {
        this.cuentas = data.map(cuenta => ({
          ...cuenta,
          cliente: cuenta.cliente || { nombre: 'Sin Cliente' } // 🔥 Manejar cuentas sin cliente
        }));
      },
      error: (err) => {
        console.error('Error al obtener cuentas:', err);
      }
    });
  }

  
}
