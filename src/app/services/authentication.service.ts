import { Injectable } from '@angular/core';
import { User, SIGN_UP, SIGN_IN, IS_AUTHENTICATED, AUTHORIZATION } from '../models/user';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private apollo: Apollo) { }

  sign_up(user: User) {
    return this.apollo.mutate({
      mutation: SIGN_UP,
      variables: {
        name: user.name,
        nickname: user.username,
        email: user.email,
        password: user.password,
        password_confirmation: user.password_confirmation
      }
    });
  }

  public isAuthenticated() {
    const token = localStorage.getItem('token')  != null ? localStorage.getItem('token')  : '';
    const client = localStorage.getItem('client')  != null ? localStorage.getItem('client')  : '';
    const uid = localStorage.getItem('uid')  != null ? localStorage.getItem('uid')  : '';
    let is_authenticated;

    this.apollo.watchQuery({
      query: IS_AUTHENTICATED,
      variables: {
        token,
        client,
        uid
      }
    }).valueChanges.subscribe(
      ({data}) => {
        is_authenticated = true;
      }, (error) => {
        is_authenticated = false;
        console.log('There was an error sending the mutation', error);
      }
    );
    return new Promise((resolve, reject) => {
      resolve(is_authenticated);
    })
  }

  auth(user: User) {
    let user_exists = false
    this.apollo.mutate({
      mutation: AUTHORIZATION,
      variables: {
        email: user.email,
        password: user.password
      }
    }).pipe().subscribe(({data}) => {
      user_exists = data.auth.answer === 'true';
    })
    return new Promise((resolve, reject) => {
      resolve(user_exists);
    })
  }

  sign_in(user: User) {
    if (this.auth(user)){
      return this.apollo.mutate({
        mutation: SIGN_IN,
        variables: {
          email: user.email,
          password: user.password
        }
      });
    }
    return null;
  }
}
