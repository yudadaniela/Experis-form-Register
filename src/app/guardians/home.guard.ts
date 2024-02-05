import { Injectable, inject } from "@angular/core";
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, } from '@angular/router';
import { Observable, pipe, map } from "rxjs";
import { ServicesFormRegisterService } from "../services/services-form-register.service";

@Injectable({
  providedIn:'root'
})
class PermissionService {
  constructor(
    private router:Router,
    private registerService:ServicesFormRegisterService
  ) {}
  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean |UrlTree{
    if(this.registerService.ifAuthentication()&&this.registerService.isAdmi()||this.registerService.isUser()){
     console.log('acceso activado home');
     return true
    }else{
     return this.router.createUrlTree(['/register'])
    }
 } 
}
export const homeGuard: CanActivateFn = (next:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean |UrlTree => {
  return inject(PermissionService).canActivate(next, state );
}

