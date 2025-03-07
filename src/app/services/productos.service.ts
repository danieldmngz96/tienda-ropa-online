import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Producto {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
  fechaCreacion: string;
  categoriaId: number;
  imagenUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'https://localhost:7295/api/Productos';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  getProductoById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  updateProducto(id: number, producto: Producto): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, producto);
  }

  subirImagen(id: number, imagen: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', imagen);
    return this.http.post(`${this.apiUrl}/SubirImagen/${id}`, formData);
  }
}
