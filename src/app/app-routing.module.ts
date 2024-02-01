import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';
import { FormCreationProductsComponent } from './form/form-creation-products/form-creation-products.component';
import { FormRegisterComponent } from './form/form-register/form-register.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginFormComponent } from './form/login-form/login-form.component';
import { AuthGuard } from './guardians/product.guard';
import { homeGuard } from './guardians/home.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home',
   component: HomePageComponent, 
   canActivate: [homeGuard]
  },
  {
    path: 'producto/:id',
    component: ProductComponent,
  },
  {
    path: 'createProduct',
    component: FormCreationProductsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: FormRegisterComponent,
  },
  {
    path: 'login',
    component: LoginFormComponent,
    //canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
