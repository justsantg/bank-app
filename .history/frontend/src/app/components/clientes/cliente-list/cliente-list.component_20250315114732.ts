import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { HttpErrorResponse } from '@angular/common/http';

import { Movimiento } from 'src/app/models/movimiento.model';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];
  ultimoMovimiento: Movimiento | null = null;
  modalInstance: any;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (data) => this.clientes = data,
      error: (error: HttpErrorResponse) => console.error('Error al obtener clientes:', error)
    });
  }

  verUltimoMovimiento(clienteId: number): void {
    this.clienteService.getUltimoMovimiento(clienteId).subscribe({
      next: (data) => {
        this.ultimoMovimiento = data;
        this.abrirModal();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener el último movimiento:', error);
        this.ultimoMovimiento = null;
      }
    });
  }

  abrirModal(): void {
    const modalElement = document.getElementById('movimientoModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
      this.modalInstance.show();
    }
  }
}
