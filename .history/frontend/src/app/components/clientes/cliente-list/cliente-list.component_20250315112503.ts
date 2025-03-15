import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule], // Asegúrate de importar CommonModule
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  clientes: any[] = []; // Definir la variable clientes como un array vacío

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (err) => {
        console.error('Error al obtener clientes:', err);
      }
    });
  }
}
