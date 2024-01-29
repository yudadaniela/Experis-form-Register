import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { ServicesFormRegisterService } from 'src/app/services/services-form-register.service';
import { User } from 'src/app/models/register';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  productos: any = [];
  user:User|null=null
  constructor(
    private productoService: ProductService,
    private registerService:ServicesFormRegisterService
    ) {}

  ngOnInit(): void {
    this.productos = this.productoService.obtenerProductos()
    //this.registerService.tokenGenerate()
  }
  // logout(){
  //   console.log(this.registerService.logout());
  //   return this.registerService.logout() 
  // }
  // currentUser(){
  //   this.user=this.registerService.user()
  //   return this.user
  // }
}
