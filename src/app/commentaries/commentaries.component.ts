import { Component, OnInit } from '@angular/core';
import { Commentary } from '../shared/commentary';

@Component({
  selector: 'app-commentaries',
  templateUrl: './commentaries.component.html',
  styleUrls: ['./commentaries.component.css']
})
export class CommentariesComponent implements OnInit {

  commentary: Commentary;
  constructor() { }

  ngOnInit() {
  }

}
