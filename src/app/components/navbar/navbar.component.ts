import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuOpen = false;
  isAuthenticated: boolean = false; // Inicialmente falso


  constructor(private categoriasService: CategoriasService,
     private http: HttpClient,
     private router: Router) {}

  ngOnInit(): void {
    this.verificarAutenticacion();
    this.isAuthenticated = !!localStorage.getItem('authToken');
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  verificarAutenticacion(): void {
    const token = localStorage.getItem('authToken');
    this.isAuthenticated = !!token; // Se autentica solo si hay un token válido
  }

  cerrarSesion(): void {
    localStorage.removeItem('authToken');
    this.isAuthenticated = false;
    this.router.navigate(['/login']); // Redirige al login
  }
}
