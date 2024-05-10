import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  userData = {
    username: '',
    email: '',
    password: '',
  };

  constructor(private router: Router, private backendService: BackendService, private toastr: ToastrService) {}

  register() {
    this.backendService.registerUser(this.userData).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        this.toastr.success('Usuario registrado satisfactoriamente', 'Éxito');
        // Lógica para manejar la respuesta del backend, como mostrar un mensaje de éxito o redirigir a otra página
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error al registrar usuario:', error);
        const errorMessage = error.error.message || 'Error al registrar usuario';
        this.toastr.error(errorMessage, 'Error');
        // Lógica para manejar el error, como mostrar un mensaje de error al usuario
      },
    });
  }

  goToLogin() {
    // Navega a la página de registro cuando se hace clic en el enlace
    this.router.navigate(['/login']);
  }
}
