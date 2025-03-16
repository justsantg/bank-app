import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = ''; // ✅ Agregar esta propiedad para evitar el error

  login() {
    if (this.usuario === 'admin' && this.contrasena === 'admin123') {
      console.log('Login exitoso');
      this.error = ''; // ✅ Limpiar el error si las credenciales son correctas
    } else {
      this.error = 'Usuario o contraseña incorrectos'; // ✅ Mostrar mensaje de error
    }
  }
}
