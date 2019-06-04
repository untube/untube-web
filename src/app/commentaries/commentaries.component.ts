import { Component, OnInit } from '@angular/core';
import { Commentary } from '../shared/commentary';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-commentaries',
  templateUrl: './commentaries.component.html',
  styleUrls: ['./commentaries.component.css']
})
export class CommentariesComponent implements OnInit {

  commentary: Commentary;
  commentForm: any;
  constructor() { }

  ngOnInit() {
    this.commentForm = new FormGroup({
      'subject': new FormControl(this.commentary.subject, Validators.required),
      'description': new FormControl(this.commentary.description, Validators.required)
    })
  }

}
