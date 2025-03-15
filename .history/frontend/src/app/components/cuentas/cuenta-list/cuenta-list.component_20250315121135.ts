import { Component, OnInit } from '@angular/core';
import { CuentaService } from '../../../services/cuenta.service';

@Component({
  selector: 'app-cuenta-list',
  templateUrl: './cuenta-list.component.html',
  styleUrls: ['./cuenta-list.component.css']
})
export class CuentaListComponent implements OnInit {
  cuentas: any[] = [];

  constructor(private cuentaService: CuentaService) {}

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
}
