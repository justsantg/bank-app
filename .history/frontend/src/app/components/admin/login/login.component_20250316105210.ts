import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Importar FormsModule

@Component({
  selector: 'app-login',
  standalone: true, // ✅ Esto indica que es un Standalone Component
  imports: [CommonModule, FormsModule], // ✅ Agregar FormsModule aquí
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: string = '';
  contrasena: string = '';

  login() {
    console.log('Usuario:', this.usuario, 'Contraseña:', this.contrasena);
  }
}
