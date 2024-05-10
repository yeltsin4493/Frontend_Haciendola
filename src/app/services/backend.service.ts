import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private baseUrl = 'http://localhost:3000/api/v1';
  // private token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }

  loadProducts(): Observable<any[]> {
    const token = localStorage.getItem('token');

    // Verificar si se encontró un token en el localStorage
    if (!token) {
      throw new Error(
        'No se encontró un token de autorización en el almacenamiento local.'
      );
    }

    // Configurar el encabezado con el token de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Realizar la solicitud GET con el encabezado configurado
    return this.http.get<any[]>(`${this.baseUrl}/products`, { headers });
  }

  saveProduct(productData: any): Observable<any> {
    const token = localStorage.getItem('token');

    // Verificar si se encontró un token en el localStorage
    if (!token) {
      throw new Error(
        'No se encontró un token de autorización en el almacenamiento local.'
      );
    }

    // Configurar el encabezado con el token de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.baseUrl}/products`, productData, { headers });
  }

  editProduct(productId: string, updatedProduct: any): Observable<any> {
    const url = `${this.baseUrl}/products/${productId}`;
    // Asegúrate de tener un token de autorización en tu localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token de autorización no encontrado.');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.patch(url, updatedProduct, { headers });
  }

  deleteProduct(productId: string): Observable<any> {
    const url = `${this.baseUrl}/products/${productId}`;
    // Asegúrate de tener un token de autorización en tu localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token de autorización no encontrado.');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete(url, { headers });
  }
}
