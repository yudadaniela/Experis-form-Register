import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { ServicesFormRegisterService } from 'src/app/services/services-form-register.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { Register } from '../../models/register';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css'],
})
export class FormRegisterComponent {
  formRegister: FormGroup;
  constructor(
    private fb: FormBuilder,
    private formRegisterService: ServicesFormRegisterService,
    private snackBar: MatSnackBar
  ) {
    this.formRegister = this.fb.group({
      personalInfo: this.fb.group({
        nickName: ['', [Validators.required, Validators.minLength(4)]],
        firtName: ['', [Validators.required, Validators.minLength(4)]],
        secondName: ['', Validators.minLength(4)],
        firtSurtname: ['', [Validators.required, Validators.minLength(4)]],
        secondSurtname: ['', Validators.minLength(4)],
        email: ['', [Validators.required, Validators.email],[this.validateEmailAsync.bind(this)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      }),
      addressInfo: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        zipCode: ['', Validators.pattern(/^\d{5}$/)],
      }),
    });
  }

 
  validateEmailAsync(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    const email = control.value;
    console.log(email);
    return of(this.formRegisterService.isEmailUnique(email)).pipe(
      map((available) => (available ? null : { uniqueEmail: true }))
    );
  }
  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  onsubmit() {
    console.log(this.formRegister.value);

    if (this.formRegister.valid) {
      if (
        this.formRegisterService.isEmailUnique(
          this.formRegister.get('personalInfo.email')?.value
        )
      ) {
        const data = {
          nickName: this.formRegister.get('personalInfo.nickName')?.value,
          fullName:
            this.formRegister.get('personalInfo.firtName')?.value +
            ' ' +
            this.formRegister.get('personalInfo.secondName')?.value +
            ' ' +
            this.formRegister.get('personalInfo.firtSurtname')?.value +
            ' ' +
            this.formRegister.get('personalInfo.secondSurtname')?.value,
          email: this.formRegister.get('personalInfo.email')?.value,
          password: this.formRegister.get('personalInfo.password')?.value,
        };
        this.formRegisterService.addUser(data);
        this.showMessage('Register', 'OK');
        console.log(this.formRegisterService.getUsers());
      } else {
        this.showMessage('Register', 'The email is registered');
      }
    }
  }
}
