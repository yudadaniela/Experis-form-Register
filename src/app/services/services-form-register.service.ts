import { Injectable } from '@angular/core';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root',
})
export class ServicesFormRegisterService {
  private users: Register[] = [
    {
      nickName: 'jhonny',
      fullName: 'John Doe',
      email: 'yudadaniela@hotmail.com',
      password: '123456',
      location: {
        pais: 'Colombia',
        estado: 'Cundinamarca',
        ciudad: 'Bogotá',
      },
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
    console.log('Users after adding:', this.users);
  }

  getUsers(): Register[] {
    return this.users;
  }
}
