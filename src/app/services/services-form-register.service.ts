import { Injectable } from '@angular/core';
import { Register, User } from '../models/register';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServicesFormRegisterService {
  private userss: Register[] = [
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
  private apiUrl = 'http://localhost:3000/users';
  private isLoggedIn: boolean = false;
  private currentUser: User | null = null;
  private token: string = '';
  private users: any = [];
  constructor(private http: HttpClient) {}
  isEmailUnique(email: string): boolean {
    return !this.userss.some((user) => user.email === email);
  }

  addUser(user: Register): Observable<any> {
    // this.users.push(user);
    // console.log('Users after adding:', this.users);
    return this.http.post(`${this.apiUrl}`, user)
    .pipe(catchError((error)=>{
      return throwError(()=>{error})
    }))
  }

  getUsers(): Observable<any> {
    this.users = this.http.get(this.apiUrl);
    console.log(this.users);
    return this.http.get(this.apiUrl);
  }
  private tokenGenerate() {
    let random1= Math.random().toString(36).substring(2)
    let random2= Math.random().toString(36).substring(2)
    let random3= Math.random().toString(36).substring(2)
    console.log(random1+random2+random3);
    return this.token= random1+random2+random3;
    // console.log(btoa(JSON.stringify(user)));
    // return (this.token = btoa(JSON.stringify(user)));
  }
  private setAccessToken() {
    sessionStorage.setItem('access_token', this.tokenGenerate());
  }
  private getAccessToken(): string | null {
    return sessionStorage.getItem('access_token');
  }
  private setHeader(): HttpHeaders {
    const token = this.getAccessToken();
    return new HttpHeaders({
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }
  login(email: string, password: string): Observable<boolean> {
    return this.getUsers().pipe(
      map((users: any[]) => {
        const user = users.find((e: any) => e.email === email && e.password === password);
  
        if (user) {
          this.isLoggedIn = true;
          this.currentUser = user;
          this.setAccessToken();
          console.log('login', this.getAccessToken());
        }
  
        return this.isLoggedIn;
      })
    ).pipe(catchError((error)=>{
      return throwError(()=>{error})
    }))
  }
  
  logout() {
    this.isLoggedIn = false;
    this.currentUser = null;
    sessionStorage.removeItem('access_token');
    console.log('remove', this.getAccessToken());

    console.log(this.isLoggedIn);
  }
  ifAuthentication(): boolean {
    console.log(this.isLoggedIn);
    const token = this.getAccessToken();
    return !!token;

    //return this.isLoggedIn;
  }
  getUser() {
    console.log(this.currentUser);
    return this.currentUser;
  }
  isAdmi(): boolean | null {
    const user = this.getUser();
    return user && user.role === 'admin';
  }
  isUser(): boolean | null {
    const user = this.getUser();
    return user && user.role === 'user';
  }
 
}
