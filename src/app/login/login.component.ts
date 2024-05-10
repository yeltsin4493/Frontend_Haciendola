import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importa Router para la navegación
import { BackendService } from '../services/backend.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userData = {
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    private backendService: BackendService,
    private toastr: ToastrService
  ) {}

  login() {
    this.backendService.login(this.userData).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        // Almacena el token JWT en el localStorage
        localStorage.setItem('token', response.token);
        // Muestra un mensaje de éxito
        this.toastr.success('Inicio de sesión exitoso', 'Éxito');
        // Redirige al usuario a la página de mantenimiento de productos
        this.router.navigate(['/product-maintenance']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        // Muestra un mensaje de error
        this.toastr.error('Credenciales incorrectas', 'Error');
      },
    });
  }

  goToRegister() {
    // Navega a la página de registro cuando se hace clic en el enlace
    this.router.navigate(['/register']);
  }
}
