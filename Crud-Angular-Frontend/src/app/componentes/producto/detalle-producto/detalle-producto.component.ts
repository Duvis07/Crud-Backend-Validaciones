import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/service/producto.service';
import { Producto } from '../../modelo/producto';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css'],
})
export class DetalleProductoComponent implements OnInit {
  producto: Producto = { id: 0, nombre: '', precio: 0 };

  constructor(
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerProducto();
  }

  obtenerProducto(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.productoService.detail(id).subscribe(
      (data) => {
        this.producto = data;
      },
      (err) => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.volver();
      }
    );
  }

  volver(): void {
    this.router.navigate(['/']);
  }
}
