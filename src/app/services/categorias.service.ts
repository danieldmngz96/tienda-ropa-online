import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private apiUrl = 'https://localhost:7295/api/Productos/ListarPorCategorias'; // Ajusta la URL según tu API
  private apiUrl2 = 'https://localhost:7295/api/Productos'; // Ajusta la URL según tu API
  constructor(private http: HttpClient) { }

  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

    // Crear un nuevo producto
    crearProducto(producto: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl2}`, producto);
    }
}
