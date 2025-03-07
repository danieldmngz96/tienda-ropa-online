import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component'; // Ajusta según tus componentes
import { LoginComponent } from '../app/components/login/login.component'; // Ajusta según tus componentes
import { ProductosComponent } from './components/productos/productos.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirección por defecto
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'productos', component: ProductosComponent },
  { path: '**', redirectTo: '/login' } // Ruta por defecto si la URL no coincide
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
