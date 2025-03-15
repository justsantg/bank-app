import { Component, OnInit } from '@angular/core';
import { ClienteService, Cliente } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.clienteService.getClientes().subscribe((data) => {
      this.clientes = data;
    });
  }
}
