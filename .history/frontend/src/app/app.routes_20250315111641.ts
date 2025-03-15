import { Routes } from '@angular/router';
import { ClienteListComponent } from './components/clientes/cliente-list/cliente-list.component';
import { CuentaListComponent } from './components/cuentas/cuenta-list/cuenta-list.component';
import { MovimientoListComponent } from './components/movimientos/movimiento-list/movimiento-list.component';

export const routes: Routes = [
  { path: 'clientes', component: ClienteListComponent },
  { path: 'cuentas', component: CuentaListComponent },
  { path: 'movimientos', component: MovimientoListComponent },
  { path: '', redirectTo: 'clientes', pathMatch: 'full' } // Redirección inicial
];
