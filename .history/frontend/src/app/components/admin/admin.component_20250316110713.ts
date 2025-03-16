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
  cliente = { nombre: '', email: '', telefono: '' }; // ✅ Inicializar cliente
}
