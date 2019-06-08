import { Injectable } from '@angular/core';
import {FormGroup, FormControl,Validators} from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class VideouploadService {

  form: FormGroup = new FormGroup({
    $id: new FormControl(null),
    title: new FormControl('',Validators.required),
    description: new FormControl('',[Validators.required, Validators.minLength(10)]),
    category: new FormControl(0)
  });

  initilizeFormGroup(){
    this.form.setValue({
      $id: null,
      title: ' ',
      description: ' ',
      category: ' ',
    })
  }

  constructor() { }


}
