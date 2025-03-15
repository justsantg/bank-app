import { Routes } from '@angular/router';
import { CuentaListComponent } from './components/cuentas/cuenta-list/cuenta-list.component';
import { CuentaDetailComponent } from './components/cuentas/cuenta-detail/cuenta-detail.component';

export const routes: Routes = [
  { path: 'cuentas', component: CuentaListComponent },
  { path: 'cuenta/:id', component: CuentaDetailComponent },
  { path: '', redirectTo: 'cuentas', pathMatch: 'full' }
];
