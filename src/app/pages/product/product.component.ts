import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  idProducto!: number;
  producto: any;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idProducto =+ params['id'];
      console.log(this.idProducto);
      
      this.producto = this.productoService.obtenerProductoPorId(this.idProducto)
    });
  }

}
