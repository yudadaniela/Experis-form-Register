import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesFormRegisterService } from 'src/app/services/services-form-register.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css'],
})
export class FormRegisterComponent  {
  formRegister: FormGroup;
  constructor(
    private fb: FormBuilder,
    private formRegisterService: ServicesFormRegisterService,
    private snackBar:MatSnackBar
  ) {
    this.formRegister = this.fb.group({
      nickName: ['', [Validators.required, Validators.minLength(4)]],
      firtName: ['', [Validators.required, Validators.minLength(4)]],
      secondName: ['', Validators.minLength(4)],
      firtSurtname: ['', [Validators.required, Validators.minLength(4)]],
      secondSurtname: ['', Validators.minLength(4)],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  showMessage(message:string, action:string){
  this.snackBar.open(message, action,{
    horizontalPosition:'center',
      verticalPosition: 'top',
      duration: 3000,
  })
  }
  onsubmit() {
    console.log(this.formRegister.value);
    
    if (this.formRegister.valid) {
      if (
        this.formRegisterService.isEmailUnique(
          this.formRegister.get('email')?.value
        )
      ) {
        const data = {
          nickName: this.formRegister.get('nickName')?.value,
          fullName: this.formRegister.get('firtName')?.value +' '+
          this.formRegister.get('secondName')?.value +' '+
          this.formRegister.get('firtSurtname')?.value +' '+
          this.formRegister.get('secondSurtname')?.value,
          email: this.formRegister.get('email')?.value,
          password: this.formRegister.get('password')?.value,
        };
        this.formRegisterService.addUser(data);
        this.showMessage('Register','OK');
        console.log(this.formRegisterService.getUsers());
      } else {
        this.showMessage('Register','The email is registered');
      }
    }
    
  }
  
}
