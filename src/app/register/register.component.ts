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
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error al registrar usuario:', error);
        const errorMessage = error.error.message || 'Error al registrar usuario';
        this.toastr.error(errorMessage, 'Error');
      },
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
