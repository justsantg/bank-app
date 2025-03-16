import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Importar FormsModule

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Agregar FormsModule
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})


export class AdminComponent {
  // ✅ Inicializar cliente
  cliente = { nombre: '', email: '', telefono: '' };

  // ✅ Inicializar cuenta
  cuenta = { tipo: '', saldo: 0, clienteId: null };

  // ✅ Inicializar movimiento
  movimiento = { monto: 0, tipo: '', cuentaId: null };
}

