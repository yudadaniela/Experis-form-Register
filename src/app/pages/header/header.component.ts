import { Component } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { ServicesFormRegisterService } from 'src/app/services/services-form-register.service';
import { User } from 'src/app/models/register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user:User|null=null
  constructor(
    private registerService:ServicesFormRegisterService,
    private router:Router
  ){

  }
  logout(){
    console.log(this.registerService.logout());
    this.router.navigate([''])
    return this.registerService.logout() 
  }
  currentUser(){
    this.user=this.registerService.getUser()
    return this.user
  }
}
