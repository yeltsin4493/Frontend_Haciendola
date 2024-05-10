import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userData = {
    username: '',
    email: '',
    password: '',
  };

  constructor(private router: Router) {}

  register() {
    // Aquí iría la lógica para enviar los datos del formulario al backend
    console.log('Registrando usuario con los siguientes datos:', this.userData);
    // Lógica de registro...
    
    // Después de registrar con éxito, redirige al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }

  goToLogin() {
    // Navega a la página de registro cuando se hace clic en el enlace
    this.router.navigate(['/login']);
  }
}
