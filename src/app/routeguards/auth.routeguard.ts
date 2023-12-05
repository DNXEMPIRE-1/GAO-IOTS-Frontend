import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,Router } from '@angular/router';
import { User } from '../model/user.model';

@Injectable()
export class AuthActivateRouteGuard implements CanActivate {
    user = new User();

    constructor(private router: Router){

    }

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
        if(sessionStorage.getItem('userdetails')){
            this.user = JSON.parse(sessionStorage.getItem('userdetails')!);
        }
        if(!this.user || this.user.id.length == 0){
            this.router.navigate(['home']);
        }
        return !!this.user;
    }

}



// Added this so user can not go to login or home page if user is logged in

@Injectable()
export class CheckAuthentication implements CanActivate {
  user = new User();

  constructor(private router: Router){

  }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
    if(sessionStorage.getItem('userdetails')){
      this.user = JSON.parse(sessionStorage.getItem('userdetails')!);
    }
    if(this.user && this.user.id.length !== 0){
        this.router.navigate(['dashboard']);
    }
    return !!this.user;
  }

}
