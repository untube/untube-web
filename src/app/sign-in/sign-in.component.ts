import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  
  user: any = {};
  signInForm: FormGroup;

  constructor(private authService: AuthenticationService) { }

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
      }, (error) => {
        console.log('There was an error sending the mutation', error);
      });
  }

}
