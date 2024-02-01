import { Injectable } from '@angular/core';
import { Register, User } from '../models/register';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServicesFormRegisterService {
  private users: Register[] = [
    {
      nickName: 'yuda',
      fullName: 'yurani nieto',
      email: 'yudadaniela@hotmail.com',
      password: '123456',
      role:'admin',
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
    {
      nickName: 'nicas',
      fullName: 'johana',
      email: 'ynieto2@slb.com',
      password: '123456',
      role:'user',
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
    {
      nickName: 'jhonny',
      fullName: 'John Doe',
      email: 'biancaspri@hotmail.com',
      password: '123456',
      role:'invite',
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
  private isLoggedIn: boolean = false;
  private currentUser: User | null = null;
  private token:string=''
  constructor(
    private http: HttpClient
  ){}
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
  tokenGenerate(){
    let random1= Math.random().toString(36).substring(2)
    let random2= Math.random().toString(36).substring(2)
    let random3= Math.random().toString(36).substring(2)
    console.log(random1+random2+random3);
    return this.token= random1+random2+random3;
  }
  private setAccessToken(){
    sessionStorage.setItem('access_token', this.tokenGenerate())
  }
  private getAccessToken():string|null{ 
   return sessionStorage.getItem('access_token')
  }
  private setHeader():HttpHeaders{
   const token =this.getAccessToken()
   return new HttpHeaders({
    'content-type':'application/json',
    'Authorization':`Bearer ${token}` 
   })
  }
  login(email: string, password: string): boolean {
    const user = this.users.find(
      (e) => e.email === email && e.password === password
    );
    if (user) {
      this.isLoggedIn = true;
      this.currentUser = user;
      this.setAccessToken()
      console.log('login', this.getAccessToken());      
      return true;
    } else {
      return false;
    }
  }
  logout() {
    //this.isLoggedIn = false;
    this.currentUser = null;
    sessionStorage.removeItem('access_token')
    console.log('remove',this.getAccessToken());
    
    console.log(this.isLoggedIn);
    
  }
  ifAuthentication(): boolean {
    console.log(this.isLoggedIn);
    const token=this.getAccessToken()
    return !!token

    //return this.isLoggedIn;
  }
  getUser() {
    console.log(this.currentUser);
    return this.currentUser;
  }
  isAdmi():boolean|null{
    const user=this.getUser()
    return user && user.role==='admin'
  }
  isUser():boolean|null{
    const user=this.getUser()
    return user && user.role==='user'
  }
  // isInvite():boolean|null{
  //   const user=this.getUser()
  //   return user && user.role==='invite'
  // }

}
