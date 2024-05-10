import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-product-maintenance',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-maintenance.component.html',
  styleUrl: './product-maintenance.component.css',
})
export class ProductMaintenanceComponent implements OnInit {
  currentUser: any; // Usuario actual
  products: any[] = []; // Lista de productos

  constructor(private router: Router, private backendService: BackendService) {}

  ngOnInit(): void {
    // Llama a loadProducts() cuando se inicializa el componente
    this.loadProducts();
  }

  logout(): void {
    // Eliminar los datos del usuario del almacenamiento local y redirigir a la página de inicio de sesión
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  openModal(): void {
    // Abrir el modal para agregar un nuevo producto
    // $('#newProductModal').modal('show');
  }

  loadProducts(): void {
    this.backendService.loadProducts().subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  editProduct(product: any): void {
    // Implementar lógica para editar un producto
  }

  deleteProduct(product: any): void {
    // Implementar lógica para eliminar un producto
  }
}
