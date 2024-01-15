import { Injectable } from '@angular/core';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class ServicesFormRegisterService {
/**
 * @todo Separate the data from the service that manipulates it. Consider to create a mock file to store this users.
 */
private users=[
  {nickName:'jhonny', fullName:'John Doe', email:'yudadaniela@hotmail.com', password:'123456'}
]

/**
 * Checks wether an email exists or not in the users database.
 * @param email A string with the email entered.
 * @returns true if the email is unique, false otherwise.
 */
isEmailUnique(email:string):boolean{
  return !this.users.some(user=>user.email===email)
}

/**
 * Adds a new user to the database
 * @param user An object of type Register with the user data
 * @todo If functions don't return anything consider to use :void
 */
addUser(user:Register){
this.users.push(user)
}

/**
 * Get a list of users
 * @returns A list of users
 */
getUsers():Register[]{
return this.users
}
}
