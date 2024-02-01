import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { ServicesFormRegisterService } from './services-form-register.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private PRODUCTOS = [
    {
      id: 1,
      name: 'Your perfect pack for everyday use and walks in the forest.',
      description: ' laptop ',
      image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      price: 109.95,
      category: 'mens clothing',
    },
    {
      id: 2,
      name: 'Mens Casual Premium Slim Fit T-Shirts',
      description:
      'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
      image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      price: 109.95,
      category: 'mens clothing',
    },
    {
      id: 3,
      name: 'Mens Cotton Jacket',
      description:'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
      image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      price: 109.95,
      category: 'mens clothing',
    },
  ];

  constructor(
    private registerService:ServicesFormRegisterService,
    private route:Router
  ) {}

  obtenerProductos() {
     if(!this.registerService.ifAuthentication()){
       this.route.navigate(['/login']);  
     }
     return this.PRODUCTOS;
  }

  obtenerProductoPorId(id: number) {
    if(!this.registerService.ifAuthentication()){
      this.route.navigate(['/login']);  
    }
    return this.PRODUCTOS.find((producto) => producto.id === id);
  }

  crearProductos(product: Product) {
    if(!this.registerService.isAdmi()){
      this.route.navigate(['']);  
    }
    this.PRODUCTOS.push(product);
    return;
  }
  editarProductos(product:Product){

  }
  eliminarProducto(id:number){

  }
}
