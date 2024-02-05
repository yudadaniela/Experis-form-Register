import { Component, OnInit } from '@angular/core';
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
import { userMapper } from 'src/app/utils/user-mapper';
import { FormLocationComponent } from "../form-location/form-location.component";

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css'],
})
export class FormRegisterComponent implements OnInit{
  formRegister: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formRegisterService: ServicesFormRegisterService,
    private snackBar: MatSnackBar,
    private formLocation: FormLocationComponent,

  ) {
    this.formRegister = this.fb.group({

      personalInfo: this.fb.group({
        nickName: ['', [Validators.required, Validators.minLength(4)]],
        firtName: ['', [Validators.required, Validators.minLength(4)]],
        secondName: ['', Validators.minLength(4)],
        firtSurtname: ['', [Validators.required, Validators.minLength(4)]],
        secondSurtname: ['', Validators.minLength(4)],
        email: [
          '',
          [Validators.required, Validators.email],
          //[this.validateEmailAsync.bind(this)]
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        role:'user',
      }),
      locationInfo: this.fb.group({
        pais: [''],
        estado: [''],
        ciudad: [''],
      }),
      addressInfo: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        zipCode: ['', Validators.pattern(/^\d{5}$/)],
      }),
    });
  }

  ngOnInit(): void {
    this.formLocation.locationDataChange.subscribe(locationInfo => {
      console.log('Evento locationDataChange recibido:', locationInfo);

      // Actualiza el formulario principal con los datos de ubicación
      this.formRegister.get('locationInfo')?.patchValue(locationInfo);

      // Agrega registros de consola para verificar la estructura del formulario principal
      console.log('Estructura del formulario principal:', this.formRegister.value);
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

  // onsubmit() {
  //   console.log(this.formRegister.value);

  //   if (this.formRegister.valid) {
  //     if (
  //       this.formRegisterService.isEmailUnique(
  //         this.formRegister.get('personalInfo.email')?.value
  //       )
  //     ) {
  //       const data = {
  //         nickName: this.formRegister.get('personalInfo.nickName')?.value,
  //         fullName:
  //           this.formRegister.get('personalInfo.firtName')?.value +
  //           ' ' +
  //           this.formRegister.get('personalInfo.secondName')?.value +
  //           ' ' +
  //           this.formRegister.get('personalInfo.firtSurtname')?.value +
  //           ' ' +
  //           this.formRegister.get('personalInfo.secondSurtname')?.value,
  //         email: this.formRegister.get('personalInfo.email')?.value,
  //         password: this.formRegister.get('personalInfo.password')?.value,
  //       };
  //       this.formRegisterService.addUser(data);
  //       this.showMessage('Register', 'OK');
  //       console.log(this.formRegisterService.getUsers());
  //     } else {
  //       this.showMessage('Register', 'The email is registered');
  //     }
  //   }
  // }

  onSubmit() {
    if (this.formRegister.valid) {
      const personalInfoValue = this.formRegister.get('personalInfo')?.value;
      const locationInfoValue = this.formRegister.get('locationInfo')?.value;

      if (personalInfoValue && locationInfoValue) {
        const user = userMapper({
          personalInfo: {
            ...personalInfoValue,
            ...locationInfoValue,
          },
          addressInfo: this.formRegister.get('addressInfo')?.value,
        });

        this.formRegisterService.addUser(user);
        console.log('Successfully registered', this.formRegisterService.getUsers());
        this.showMessage('Register', 'OK');
      } else {
        console.log('INVALID FORM:', this.formRegister.value);
        this.showMessage('Register', 'The email is registered, try with another email');
      }
    }
  }


  // updateLocationData(locationForm: FormGroup) {
  //   console.log('Datos de ubicación recibidos:', locationForm.value);
  //   console.log('Estado actual del formulario:', this.formRegister.value);
  //   this.formRegister.get('locationInfo')?.patchValue(locationForm.get('locationInfo')?.value);
  // }
  updateLocationData(locationInfo: any) {
    console.log('Datos de ubicación recibidos:', locationInfo);
    this.formRegister.get('locationInfo')?.setValue(locationInfo);
    this.formRegister.updateValueAndValidity(); // Forzar actualización
  }



}
