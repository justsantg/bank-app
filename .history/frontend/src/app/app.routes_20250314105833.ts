import { Routes } from '@angular/router';
import { ClienteListComponent } from './components/clientes/cliente-list/cliente-list.component';
import { ClienteDetailComponent } from './components/clientes/cliente-detail/cliente-detail.component';
import { MovimientoListComponent } from './components/movimientos/movimiento-list/movimiento-list.component';
import { MovimientoDetailComponent } from './components/movimientos/movimiento-detail/movimiento-detail.component';
import { CuentaDetailComponent } from './compo/cuentas/cuenta-detail/cuenta-detail.component';



export const routes: Routes = [
  { path: '', redirectTo: 'clientes', pathMatch: 'full' },
  { path: 'clientes', component: ClienteListComponent },
  { path: 'clientes/:id', component: ClienteDetailComponent },
  { path: 'cuentas/:id', component: CuentaDetailComponent },
  { path: 'movimientos', component: MovimientoListComponent },
  { path: 'movimientos/:id', component: MovimientoDetailComponent },
];
