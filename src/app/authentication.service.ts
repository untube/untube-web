import { Injectable } from '@angular/core';
import { User } from './shared/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  sign_in(user: User) {
    throw new Error("Method not implemented.");
  }

  constructor() { }
}
