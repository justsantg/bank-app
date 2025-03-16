import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ClienteListComponent } from './components/clientes/cliente-list/cliente-list.component';
import { CuentaListComponent } from './components/cuentas/cuenta-list/cuenta-list.component';
import { MovimientoListComponent } from './components/movimientos/movimiento-list/movimiento-list.component';
import { LoginComponent } from './components/admin/login/login.component';
import { AdminComponent } from './components/admin/admin/admin.component';
export const routes: Routes = [
  { path: '', component: HomeComponent }, // ✅ Página principal
  { path: 'clientes', component: ClienteListComponent },
  { path: 'cuentas', component: CuentaListComponent },
  { path: 'movimientos', component: MovimientoListComponent },
  { path: 'login', component: LoginComponent }, // ✅ Ruta para Login
  { path: 'admin', component: AdminComponent }, // ✅ Ruta protegida del Admin
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirige rutas no encontradas a Home
];
