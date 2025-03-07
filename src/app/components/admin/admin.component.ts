import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  productos: any[] = [];
  selectedProductId: number | null = null;
  productoSeleccionado: any | null = null;

  selectedImage: File | null = null;
  imagePreview: string | null = null;
  apiUrl = 'https://localhost:7295/api/Productos';

  nuevoProducto = {
    nombre: '',
    cantidad: 0,
    precio: 0,
    imagenUrl: '',
    categoriaId: null
  };

  constructor(private categoriasService: CategoriasService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.categoriasService.getCategorias().subscribe({
      next: (data) => {
        this.productos = data.flatMap(categoria =>
          categoria.productos.map(producto => ({
            ...producto,
            categoriaId: categoria.id
          }))
        );
        console.log("Productos cargados:", this.productos);
      },
      error: () => Swal.fire('Error', 'No se pudieron obtener los productos.', 'error')
    });
  }

  onSelectProduct(): void {
    this.productoSeleccionado = this.productos.find(p => p.id == this.selectedProductId) || null;
    console.log("Producto seleccionado:", this.productoSeleccionado);
  }

  onSaveProduct(): void {
    if (this.productoSeleccionado) {
      this.actualizarProducto();
    } else {
      this.crearProducto();
    }
  }

  actualizarProducto(): void {
    if (!this.productoSeleccionado || !this.productoSeleccionado.categoriaId) {
      Swal.fire('Error', 'El producto debe tener una categoría válida.', 'error');
      return;
    }

    const url = `${this.apiUrl}/${this.productoSeleccionado.id}`;
    console.log('📤 Datos enviados al servidor:', JSON.stringify(this.productoSeleccionado, null, 2));

    this.http.put(url, this.productoSeleccionado).subscribe({
      next: () => {
        Swal.fire('¡Producto actualizado!', `Se ha actualizado correctamente: ${this.productoSeleccionado.nombre}`, 'success');
      },
      error: (err) => {
        console.error('❌ Error en la actualización:', err);
        Swal.fire('Error', 'No se pudo actualizar el producto.', 'error');
      }
    });
  }

  crearProducto(): void {
    if (!this.nuevoProducto.nombre || this.nuevoProducto.precio <= 0) {
      Swal.fire('Error', 'Por favor, completa todos los campos correctamente.', 'error');
      return;
    }

    this.categoriasService.crearProducto(this.nuevoProducto).subscribe({
      next: (response) => {
        Swal.fire('¡Producto creado!', `Se ha creado correctamente: ${this.nuevoProducto.nombre}`, 'success');
        this.productos.push(response);
        this.nuevoProducto = { nombre: '', cantidad: 0, precio: 0, imagenUrl: '', categoriaId: null };
      },
      error: (err) => {
        console.error('Error al crear producto:', err);
        Swal.fire('Error', 'Hubo un problema al crear el producto.', 'error');
      }
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  onUploadImage(): void {
    if (!this.selectedImage) {
      Swal.fire('Error', 'Por favor, selecciona una imagen antes de subir.', 'error');
      return;
    }
    Swal.fire('¡Imagen subida!', `Se ha subido correctamente: ${this.selectedImage.name}`, 'success');
  }

  onCreateProduct(): void {
    if (!this.nuevoProducto.nombre || this.nuevoProducto.precio <= 0 || !this.nuevoProducto.categoriaId) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, completa todos los campos correctamente.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    console.log('📤 JSON enviado al backend:', JSON.stringify(this.nuevoProducto, null, 2));

    this.categoriasService.crearProducto(this.nuevoProducto).subscribe({
      next: (response) => {
        Swal.fire({
          title: '¡Producto creado!',
          text: `Se ha creado correctamente: ${this.nuevoProducto.nombre}`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });

        this.productos.push(response);

        // Reiniciar el formulario
        this.nuevoProducto = { nombre: '', cantidad: 0, precio: 0, imagenUrl: '', categoriaId: null };
      },
      error: (err) => {
        console.error('❌ Error al crear producto:', err);
        Swal.fire('Error', 'Hubo un problema al crear el producto.', 'error');
      }
    });
  }
}
