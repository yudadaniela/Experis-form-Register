import { Injectable } from '@angular/core';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root',
})
export class ServicesFormRegisterService {
  private users = [
    {
      nickName: 'jhonny',
      fullName: 'John Doe',
      email: 'yudadaniela@hotmail.com',
      password: '123456',
      address: {
        street: 'street1',
        city: 'city1',
        zipCode: '12345',
      },
    },
  ];

  isEmailUnique(email: string): boolean {
    return !this.users.some((user) => user.email === email);
  }
  addUser(user: Register) {
    this.users.push(user);
  }
  getUsers(): Register[] {
    return this.users;
  }
}
