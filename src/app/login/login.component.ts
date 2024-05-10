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
        localStorage.setItem('token', response.token);
        this.toastr.success('Inicio de sesión exitoso', 'Éxito');
        this.router.navigate(['/product-maintenance']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.toastr.error('Credenciales incorrectas', 'Error');
      },
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
