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
    return new Promise((resolve, reject) => {
      this.apollo.mutate({
        mutation: SIGN_UP,
        variables: {
          name: user.name,
          nickname: user.username,
          email: user.email,
          password: user.password,
          password_confirmation: user.password_confirmation
        }
      }).subscribe(({data}) => {
        localStorage.setItem('token', data.createUser.token);
        localStorage.setItem('client', data.createUser.client);
        localStorage.setItem('uid', user.email);
        resolve(data);
      });
    });
  }

  public getUserData(): Promise<any> {
    const token = localStorage.getItem('token')  != null ? localStorage.getItem('token')  : '';
    const client = localStorage.getItem('client')  != null ? localStorage.getItem('client')  : '';
    const uid = localStorage.getItem('uid')  != null ? localStorage.getItem('uid')  : '';
    return new Promise((resolve, reject) => {
      this.apollo.watchQuery({
        query: IS_AUTHENTICATED,
        variables: {
          token,
          client,
          uid
        }
      }).valueChanges.subscribe(
        ({data}) => {
          resolve(data);
        }, (error) => {
          reject(error);
          console.log('There was an error sending the mutation', error);
        }
      );
    });
  }

  auth(user: User): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.apollo.mutate({
        mutation: AUTHORIZATION,
        variables: {
          email: user.email,
          password: user.password
        }
      }).pipe().subscribe(({data}) => {
        const user_exists = data.auth.answer === 'true';
        resolve(user_exists);
      });
    });
  }

  sign_in(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth(user).then((response) => {
        if (response) {
          this.apollo.mutate({
            mutation: SIGN_IN,
            variables: {
              email: user.email,
              password: user.password
            }
          }).subscribe(({data}) => {
            localStorage.setItem('token', data.createSession.token);
            localStorage.setItem('client', data.createSession.client);
            localStorage.setItem('uid', user.email);
            resolve({data, message: 'Usuario autorizado'});
          }, (error) => {
            reject(error);
          });
        } else {
          resolve({data: null, message: 'Usuario no autorizado comuniquese con el administrador del sistema'});
        }
      })
    });
  }

  public resolveAfterSeconds(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        const token = localStorage.getItem('token')  != null ? localStorage.getItem('token')  : '';
        const client = localStorage.getItem('client')  != null ? localStorage.getItem('client')  : '';
        const uid = localStorage.getItem('uid')  != null ? localStorage.getItem('uid')  : '';
        let is_authenticated;

        if (localStorage.getItem('token') == null) {
          is_authenticated = false;
          resolve(false);
        } else {
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
              resolve(is_authenticated);
            }, (error) => {
              is_authenticated = false;
              console.log('There was an error sending the mutation', error);
            }
          );
        }
      });
      setTimeout(() => resolve(false), 1000);
    });
  }



}
