import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  categorias: any[] = [];

  constructor(private categoriasService: CategoriasService) {}

  ngOnInit(): void {
    this.categoriasService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (err) => {
        console.error('Error al obtener categorías:', err);
      }
    });
  }
}
