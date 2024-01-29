import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ProductService } from "../../services/product.service";
import  {v4 as uuidv4}  from "uuid";
import { Router } from '@angular/router';
import { FormDetailProductsComponent } from "../form-detail-products/form-detail-products.component";

@Component({
  selector: 'app-form-creation-products',
  templateUrl: './form-creation-products.component.html',
  styleUrls: ['./form-creation-products.component.css']
})
export class FormCreationProductsComponent implements OnInit {
  creationProductForm:FormGroup
  constructor(
   private fb:FormBuilder,
   private productService:ProductService,
   private router: Router,
   private detailForm:FormDetailProductsComponent
   
   ){
    this.creationProductForm=this.fb.group({
      createProduc:this.fb.group({
        id:this.generateId(),
        name:['', Validators.required],
        description:['', Validators.required],
      }),
      detailProductForm:this.fb.group({
        category:[''],
        image:[''],
        price:[''], 
      }),
    });
    
  }
  ngOnInit(): void {
   this.detailForm.detailsProductChange.subscribe((detailProductForm)=>{
   this.creationProductForm.get('detailProductForm')?.patchValue(detailProductForm)
   })
  }

   onSubmit(){
    const formProduct=this.creationProductForm.value
    this.productService.crearProductos(formProduct)
    console.log(this.productService.obtenerProductos());
    //this.router.navigate(['/home'])
   }
   generateId(){
    const id=Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
    return id
   }
   updateProduct(detailProductForm:any){
    this.creationProductForm.get('detailProductForm')?.setValue(detailProductForm);
    this.creationProductForm.updateValueAndValidity();
   }
}
