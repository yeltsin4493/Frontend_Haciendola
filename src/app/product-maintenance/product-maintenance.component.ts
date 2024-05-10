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
  products: any[] = [];
  selectedProduct: any = {};
  newProduct: any = {
    handle: '',
    title: '',
    description: '',
    sku: '',
    grams: '',
    stock: '',
    price: '',
    compare_price: '',
    barcode: '',
  };
  deleteConfirmationVisible: boolean = false;
  productToDelete: any;
  pagedProducts: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4;

  constructor(
    private router: Router,
    private backendService: BackendService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  openModal(): void {
    $(this.modal?.nativeElement).modal('show');
  }

  loadProducts(): void {
    this.backendService.loadProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.setPage(1);
        this.toastr.success('Se listaron los productos', 'Éxito');
      },
      error: (error) => {
        this.toastr.error('Hubo un error al listar los productos', 'Error');
        console.error('Error al cargar los productos:', error);
      },
    });
  }

  saveProduct(): void {
    this.backendService.saveProduct(this.newProduct).subscribe({
      next: (response) => {
        console.log('Producto guardado:', response);
        $(this.modal?.nativeElement).modal('hide');
        this.toastr.success('Se guardo el producto', 'Éxito');
        this.loadProducts();

      },
      error: (error) => {
        console.error('Error al guardar producto:', error);
        this.toastr.error('Hubo un error al guardar el producto', 'Error');
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
          this.toastr.success('Se edito el producto', 'Éxito');
          this.loadProducts();
        },
        error: (error) => {
          console.error('Error al actualizar producto:', error);
          this.toastr.error('Hubo un error al editar el producto', 'Error');
        },
      });
  }

  modalDelete(product: any): void {
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
          this.hideDeleteConfirmation();
          this.toastr.success('Se elimino el producto', 'Éxito');
          this.loadProducts();
        },
        error: (error) => {
          console.error('Error al eliminar producto:', error);
          this.toastr.error('Hubo un error al eliminar el producto', 'Error');
        },
      });
    }
  }

  hideDeleteConfirmation(): void {
    $(this.modaldelete?.nativeElement).modal('hide');
    this.deleteConfirmationVisible = false;
    this.productToDelete = null;
  }

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(
      startIndex + this.itemsPerPage,
      this.products.length
    );
    this.pagedProducts = this.products.slice(startIndex, endIndex);
  }

  get totalPages(): number[] {
    return Array.from(
      { length: Math.ceil(this.products.length / this.itemsPerPage) },
      (_, i) => i + 1
    );
  }
}
