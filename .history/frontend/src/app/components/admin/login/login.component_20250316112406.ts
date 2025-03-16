import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private router: Router) {} // 🔥 Inyectamos el Router

  login() {
    if (this.username === 'admin' && this.password === 'admin123') {
      console.log('Login exitoso');
      this.router.navigate(['/admin']); // 🔥 Redirige a la vista de administrador
    } else {
      this.error = 'Usuario o contraseña incorrectos';
    }
  }
}
