import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // ✅ Importamos el Router para la navegación

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
  error: string = '';

  constructor(private router: Router) {} // ✅ Inyectamos el Router

  login() {
    if (this.username === 'admin' && this.password === 'admin123') {
      console.log('Login exitoso');
      this.error = ''; // ✅ Limpiar el error
      this.router.navigate(['/admin']); // ✅ Redirigir al admin después del login exitoso
    } else {
      this.error = 'Usuario o contraseña incorrectos'; // ✅ Mostrar mensaje de error
    }
  }
}
