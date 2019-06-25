import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public auth: AuthenticationService, public router: Router) {}

  canActivate(): boolean {
    let is_authenticated;
    this.auth.isAuthenticated().then( value => {
      is_authenticated = value;
      if(!is_authenticated){
        this.router.navigate(['sign-in']);
      }
    })
    return is_authenticated;
  }
}