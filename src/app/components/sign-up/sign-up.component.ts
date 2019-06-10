import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from '../../custom-validators';
import { User } from '../../models/user';
import { Category } from '../../models/category';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  
  user: any = {};
  signUpForm: FormGroup;
  categories: Category[];

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.user = new User();
    this.signUpForm = new FormGroup({
      'name': new FormControl(this.user.name, Validators.required),
      'username': new FormControl(this.user.username, Validators.required),
      'email': new FormControl(this.user.email, [Validators.email, Validators.required]),
      'password': new FormControl(this.user.password, [Validators.required, Validators.minLength(8)]),
      'password_confirmation': new FormControl(this.user.password_confirmation, [Validators.required, Validators.minLength(8)] ),
      'category': new FormControl(this.user.favorite_category),
      'check_conditions': new FormControl(this.user.check_conditions,  Validators.requiredTrue)
    });
    CustomValidators.passwordMatchValidator(this.signUpForm);
  }

  onSubmit() {
    this.user = this.signUpForm.value;
    this.authService.sign_up(this.user).subscribe(({data}) => {
        console.log('Got data', data);
      }, (error) => {
        console.log('There was an error sending the mutation', error);
      });
  }


}
