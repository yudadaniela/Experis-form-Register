import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ProductService } from "../../services/product.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-detail-products',
  templateUrl: './form-detail-products.component.html',
  styleUrls: ['./form-detail-products.component.css']
})
export class FormDetailProductsComponent implements OnInit {
  detailProductForm:FormGroup
  @Output() detailsProductChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(
   private fb:FormBuilder,
   private productService:ProductService,
   private router: Router,
   
   ){
    this.detailProductForm=this.fb.group({
    category:['', Validators.required],
    image:['', Validators.required],
    price:['', Validators.required], 
    })
   }
  ngOnInit(): void {
   const categoryPredeterminado='';
   const imagenPredeterminado='';
   const pricePredeterminado='';

   this.detailProductForm=this.fb.group({
    category:[categoryPredeterminado, Validators.required],
    image:[imagenPredeterminado, Validators.required],
    price:[pricePredeterminado, Validators.required],
   })
   this.detailProductForm.valueChanges.subscribe(()=>{
     this.emitDataProduct()
   })
  }
  emitDataProduct(){
    const dataProduct={
      category:this.detailProductForm.value.category,
      image:this.detailProductForm.value.image,
      price:this.detailProductForm.value.price
    }
    this.detailsProductChange.emit(dataProduct)
  }
   
}
