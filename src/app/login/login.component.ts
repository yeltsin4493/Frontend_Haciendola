import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importa Router para la navegación

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userData = {
    username: '',
    password: '',
  };

  constructor(private router: Router) {}

  login() {
    // Aquí iría la lógica para enviar los datos del formulario al backend
    console.log('Iniciando sesión con los siguientes datos:', this.userData);
    // Lógica de autenticación...
  }

  goToRegister() {
    // Navega a la página de registro cuando se hace clic en el enlace
    this.router.navigate(['/register']);
  }
}
