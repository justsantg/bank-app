import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ClienteListComponent } from './components/clientes/cliente-list/cliente-list.component';
import { CuentaListComponent } from './components/cuentas/cuenta-list/cuenta-list.component';
import { MovimientoListComponent } from './components/movimientos/movimiento-list/movimiento-list.component';
import { LoginComponent } from './components/admin/login/login.component';
✅ Importamos el componente Admin
import { AuthGuard } from './guards/auth.guard'; // ✅ Importamos el guard

export const routes: Routes = [
  { path: '', component: HomeComponent }, // ✅ Página principal
  { path: 'clientes', component: ClienteListComponent },
  { path: 'cuentas', component: CuentaListComponent },
  { path: 'movimientos', component: MovimientoListComponent },
  { path: 'login', component: LoginComponent }, // ✅ Ruta de Login
  { 
    path: 'admin', 
    component: AdminComponent, 
    canActivate: [AuthGuard] // ✅ Protegemos con AuthGuard
  },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirige rutas no encontradas a Home
];
