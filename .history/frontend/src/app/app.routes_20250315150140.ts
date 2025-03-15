import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ClienteListComponent } from './components/clientes/cliente-list/cliente-list.component';
import { CuentaListComponent } from './components/cuentas/cuenta-list/cuenta-list.component';
import { MovimientoListComponent } from './components/movimientos/movimiento-list/movimiento-list.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // ✅ Página principal
  { path: 'admin', component: AdminDashboardComponent},
  { path: 'clientes', component: ClienteListComponent },
  { path: 'cuentas', component: CuentaListComponent },
  { path: 'movimientos', component: MovimientoListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirige rutas no encontradas a Home
];
