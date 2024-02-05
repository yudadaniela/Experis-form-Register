import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ServicesFormRegisterService } from 'src/app/services/services-form-register.service';
import { User } from 'src/app/models/register';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  products: any;
  user: User | null = null;
  isEditing:boolean=false
  selectedProduct:any={}
  constructor(
    private productoService: ProductService,
    private registerService: ServicesFormRegisterService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts() {
    this.productoService.obtenerProductos().subscribe((res) => {
      
      this.products = res;
      console.log(this.products);
      
    });
  }
  editProduct(product:any) {
    this.isEditing=true
    this.selectedProduct={...product}
  }

  deleteProduct(id: number) {
    this.productoService.eliminarProducto(id).subscribe(() => {
      this.loadProducts()
    });
  }
  logout() {
    console.log(this.registerService.logout());
    return this.registerService.logout();
  }
  currentUser() {
    return this.registerService.isAdmi();
  }
}
