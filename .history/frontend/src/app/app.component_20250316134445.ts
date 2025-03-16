import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // ✅ Importamos Router

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ Agregamos RouterModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {} // ✅ Inyectamos Router

  irAAdmin(): void {
    this.router.navigate(['/login']); // ✅ Redirige a la página de login antes de acceder al admin
  }
}
