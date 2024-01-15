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

  /**
   * @todo Consider to move the creation of the form to the ngOnInit method
   */
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
        email: ['', [Validators.required, Validators.email], [this.validateEmailAsync.bind(this)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      }),
      addressInfo: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        zipCode: ['', Validators.pattern(/^\d{5}$/)],
      }),
    });
  }

  /**
   * Custom validator that checks if the email already exists in the database or not
   * @param control An input control of type email
   * @returns null if the email doesn't exists, an object of type ValidationErrors otherwise.
   * @toco Consider to add a catchError operator to notify if something went wrong with the validator
   */
  validateEmailAsync(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    const email = control.value;
    console.log(email);
    return of(this.formRegisterService.isEmailUnique(email)).pipe(
      map((available) => (available ? null : { uniqueEmail: true }))
    );
  }

  /**
   * Show a pop up message
   * @param message The content of the message
   * @param action The style of the message
   * @todo Add a  more descriptive name to this method, what kind of message is displaying?
   */
  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  /**
   * Submit the form information, if it's valid creates a new user in the database.
   * @todo Eliminate console.log if not necessary. Separate responsabilities, the formatting of the user data that will be send should be in a separate place . Consider to show a message when the form is not valid.
   */
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
