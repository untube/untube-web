import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthenticationService, public router: Router) {}

  /*canActivate(): boolean {
    let is_authenticated;
    this.auth.isAuthenticated().then( value => {
      is_authenticated = value;
      if(!is_authenticated){
        this.router.navigate(['sign-in']);
      }
    })
    return is_authenticated;
  }*/

  async canActivate(){

    let is_authenticated;

    is_authenticated = await this.auth.resolveAfterSeconds();

    if(!is_authenticated){
      localStorage.clear();
      this.router.navigate(['sign-in']);
    }
    return is_authenticated;
  }


}