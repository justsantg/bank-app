import { Routes } from '@angular/router';
import { ClienteListComponent } from './pages/clientes/cliente-list/cliente-list.component';
import { ClienteDetailComponent } from './pages/clientes/cliente-detail/cliente-detail.component';
import { CuentaListComponent } from './pages/cuentas/cuenta-list/cuenta-list.component';
import { MovimientoListComponent } from './pages/movimientos/movimiento-list/movimiento-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'clientes', pathMatch: 'full' },
  { path: 'clientes', component: ClienteListComponent },
  { path: 'clientes/:id', component: ClienteDetailComponent },
  { path: 'cuentas', component: CuentaListComponent },
  { path: 'movimientos', component: MovimientoListComponent }
];
