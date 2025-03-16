import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Importa FormsModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Agrega FormsModule aquí
  templateUrl: '../',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  login() {
    if (this.username === 'admin' && this.password === 'admin123') {
      console.log('Login exitoso');
      this.error = '';
    } else {
      this.error = 'Usuario o contraseña incorrectos';
    }
  }
}
