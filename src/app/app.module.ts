import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormRegisterComponent } from './form/form-register/form-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormLocationComponent } from './form/form-location/form-location.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductComponent } from './pages/product/product.component';
import { FormCreationProductsComponent } from './form/form-creation-products/form-creation-products.component';
import { RouterModule } from '@angular/router';
import { FormDetailProductsComponent } from './form/form-detail-products/form-detail-products.component';
import { LoginFormComponent } from './form/login-form/login-form.component';
import { HeaderComponent } from './pages/header/header.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    FormRegisterComponent,
    FormLocationComponent,
    HomePageComponent,
    ProductComponent,
    FormCreationProductsComponent,
    FormDetailProductsComponent,
    LoginFormComponent,
    HeaderComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule
  ],

  providers: [FormLocationComponent, FormDetailProductsComponent,
  {provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true}],

  bootstrap: [AppComponent]
})
export class AppModule { }
