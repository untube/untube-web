import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  
  user: any = {};
  signInForm: FormGroup;

  constructor(private authService: AuthenticationService,
              private router: Router) { }

   ngOnInit() {
    this.user = new User();
    this.signInForm = new FormGroup({
      'email': new FormControl(this.user.email, [Validators.email, Validators.required]),
      'password': new FormControl(this.user.password, [Validators.required, Validators.minLength(8)]),
    });
  }
  
  onSubmit() {
    this.user = this.signInForm.value;
    this.authService.sign_in(this.user).subscribe(({data}) => {
        console.log('Got data', data);
        this.router.navigate(['/']);
        localStorage.setItem('token', data.createSession.token);
        localStorage.setItem('client', data.createSession.client);
        localStorage.setItem('type', data.createSession.type);
        localStorage.setItem('uid', this.user.email);
      }, (error) => {
        console.log('There was an error sending the mutation', error);
      });
  }

}
