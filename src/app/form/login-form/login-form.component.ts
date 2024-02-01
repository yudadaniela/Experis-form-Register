import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ServicesFormRegisterService } from "../../services/services-form-register.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
 loginForm:FormGroup
 constructor(
  private fb:FormBuilder, 
  private serviceRegister:ServicesFormRegisterService,
  private router:Router
 ){
 this.loginForm=this.fb.group({
   email:['',[Validators.required]],
   password:['',[Validators.required]]
 })
 }
  onSubmit(){
    const email=this.loginForm.get('email')?.value
    console.log(email);
    
    const password=this.loginForm.get('password')?.value
    console.log(password);
    
    const login=this.serviceRegister.login(email, password)
    console.log(login);
    if(login){
    console.log('se hizo login'); 
    this.router.navigate(['/home'])
  } else{
    console.log('no se ha registrado');
    this.router.navigate(['/register'])
  } 
  }

}
