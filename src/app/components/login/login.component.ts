import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(event: Event): void {
    event.preventDefault(); // Evita que el formulario recargue la página

    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, ingresa tu correo y contraseña';
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Bienvenido',
          text: `Hola, ${response.nombre}`,
          confirmButtonText: 'Aceptar'
        });
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error en el login:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Correo o contraseña incorrectos',
          confirmButtonText: 'Intentar de nuevo'
        });
      }
    });
  }
}
