import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormRegisterComponent } from './form/form-register/form-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormLocationComponent } from './form/form-location/form-location.component';

@NgModule({
  declarations: [
    AppComponent,
    FormRegisterComponent,
    FormLocationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [ FormLocationComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
