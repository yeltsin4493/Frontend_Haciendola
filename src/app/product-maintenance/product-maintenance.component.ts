import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { ToastrService } from 'ngx-toastr';

// @ts-ignore
const $: any = window['$'];

@Component({
  selector: 'app-product-maintenance',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-maintenance.component.html',
  styleUrl: './product-maintenance.component.css',
})
export class ProductMaintenanceComponent implements OnInit {
  @ViewChild('modal') modal?: ElementRef;
  @ViewChild('modaledit') modaledit?: ElementRef;
  @ViewChild('modaldelete') modaldelete?: ElementRef;
  products: any[] = []; // Lista de productos
  selectedProduct: any = {};
  newProduct: any = {
    handle: '',
    title: '',
    description: '',
    sku: '',
    grams: '',
    stock: 0,
    price: '',
    compare_price: '',
    barcode: '',
  };
  deleteConfirmationVisible: boolean = false;
  productToDelete: any;

  constructor(private router: Router, private backendService: BackendService, private toastr: ToastrService) {}

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
    $(this.modal?.nativeElement).modal('show');
  }

  loadProducts(): void {
    this.backendService.loadProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.toastr.success('Se listaron los productos', 'Éxito');
      },
      error: (error) => {
        console.error('Error al cargar los productos:', error);
      },
    });
  }

  saveProduct(): void {
    this.backendService.saveProduct(this.newProduct).subscribe({
      next: (response) => {
        console.log('Producto guardado:', response);
        $(this.modal?.nativeElement).modal('hide');

        // Aquí puedes agregar lógica adicional, como mostrar un mensaje de éxito o limpiar el formulario
      },
      error: (error) => {
        console.error('Error al guardar producto:', error);
        // Aquí puedes agregar lógica para manejar errores, como mostrar un mensaje de error al usuario
      },
    });
  }

  modalEdit(product: any): void {
    // Implementar lógica para editar un producto
    this.selectedProduct = product;
    $(this.modaledit?.nativeElement).modal('show');
  }

  editProduct() {
    const updatedProduct = {
      handle: this.selectedProduct.handle,
      title: this.selectedProduct.title,
      description: this.selectedProduct.description,
      sku: this.selectedProduct.sku,
      grams: this.selectedProduct.grams,
      stock: this.selectedProduct.stock,
      price: this.selectedProduct.price,
      compare_price: this.selectedProduct.compare_price,
      barcode: this.selectedProduct.barcode,
    };
    console.log(this.selectedProduct);
    this.backendService
      .editProduct(this.selectedProduct.id, updatedProduct)
      .subscribe({
        next: (response) => {
          console.log('Producto actualizado:', response);
          $(this.modaledit?.nativeElement).modal('hide');

          // Aquí puedes agregar lógica adicional, como mostrar un mensaje de éxito o recargar la lista de productos
        },
        error: (error) => {
          console.error('Error al actualizar producto:', error);
          // Aquí puedes agregar lógica para manejar errores, como mostrar un mensaje de error al usuario
        },
      });
  }

  modalDelete(product: any): void {
    // Implementar lógica para editar un producto
    this.productToDelete = product;
    $(this.modaldelete?.nativeElement).modal('show');
  }

  showDeleteConfirmation(product: any): void {
    $(this.modaldelete?.nativeElement).modal('show');
    this.productToDelete = product;
    this.deleteConfirmationVisible = true;
  }

  confirmDelete(): void {
    if (this.productToDelete) {
      this.backendService.deleteProduct(this.productToDelete.id).subscribe({
        next: (response) => {
          console.log('Producto eliminado:', this.productToDelete);
          // Actualizar la lista de productos después de eliminar
          this.loadProducts();
          // Ocultar el modal de confirmación
          this.hideDeleteConfirmation();
        },
        error: (error) => {
          console.error('Error al eliminar producto:', error);
          // Aquí puedes agregar lógica para manejar errores, como mostrar un mensaje de error al usuario
        },
      });
    }
  }

  hideDeleteConfirmation(): void {
    $(this.modaldelete?.nativeElement).modal('hide');
    this.deleteConfirmationVisible = false;
    this.productToDelete = null;
  }
}
