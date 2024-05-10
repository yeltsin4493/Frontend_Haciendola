import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductMaintenanceComponent } from './product-maintenance/product-maintenance.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'product-maintenance', component: ProductMaintenanceComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redireccionar al login por defecto
  { path: '**', redirectTo: '/login' } // Redireccionar a login si la ruta no existe
];
