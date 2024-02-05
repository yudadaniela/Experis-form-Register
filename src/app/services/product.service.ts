import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { ServicesFormRegisterService } from './services-form-register.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

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
  private apiUrl='http://localhost:3000/productt'
  constructor(
    private registerService:ServicesFormRegisterService,
    private route:Router,
    private http:HttpClient

  ) {}

  obtenerProductos() {
     if(!this.registerService.ifAuthentication()){
       this.route.navigate(['/login']);  
     }
     return this.http.get<any[]>(this.apiUrl)
     .pipe(catchError((error)=>{
      return throwError(()=>{error})
    }))
  }

  obtenerProductoPorId(id: number) {
    if(!this.registerService.ifAuthentication()){
      this.route.navigate(['/login']);  
    }
    return this.http.get<any>(`${this.apiUrl}/${id}`)
    .pipe(catchError((error)=>{
      return throwError(()=>{error})
    }))
  }

  crearProductos(product: Product) {
    if(!this.registerService.isAdmi()){
      this.route.navigate(['']);  
    }
    return this.http.post<any>(this.apiUrl, product)
    .pipe(catchError((error)=>{
      return throwError(()=>{error})
    }))
  }
  editarProductos(id:number, product:Product):Observable<any>{
    if(!this.registerService.isAdmi()){
      this.route.navigate(['']);  
    }
    return this.http.put<any>(`${this.apiUrl}/${id}`, product)
    .pipe(catchError((error)=>{
      return throwError(()=>{error})
    }))
  }
  eliminarProducto(id:number){
    if(!this.registerService.isAdmi()){
      this.route.navigate(['']);  
    }
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
    .pipe(catchError((error)=>{
      return throwError(()=>{error})
    }))
  }
}
