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
}
