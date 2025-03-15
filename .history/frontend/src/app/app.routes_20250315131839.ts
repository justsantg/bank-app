import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Página principal
  { path: 'clientes', loadComponent: () => import('./components/clientes/cliente-list/cliente-list.component').then(m => m.ClienteListComponent) },
  { path: 'cuentas', loadComponent: () => import('./components/cuentas/cuenta-list/cuenta-list.component').then(m => m.CuentaListComponent) },
  { path: 'movimientos', loadComponent: () => import('./components/movimientos/movimiento-list/movimiento-list.component').then(m => m.MovimientoListComponent) }
];
