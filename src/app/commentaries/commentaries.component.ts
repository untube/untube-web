import { Component, OnInit } from '@angular/core';
import { Query, Commentary, COMMENTARIES_BY_VIDEO, CREATE_COMMENTARY } from '../shared/commentary';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-commentaries',
  templateUrl: './commentaries.component.html',
  styleUrls: ['./commentaries.component.css']
})
export class CommentariesComponent implements OnInit {

  commentary: Commentary;
  commentForm: FormGroup;
  commentaries$: any;
  id_user: Number = 123;
  id_video: String = "dfhasduio132"
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.commentaries$ = this.apollo.watchQuery<Query>({query: COMMENTARIES_BY_VIDEO, variables: {id: this.id_video}}).valueChanges.pipe(map( result => result.data.commentariesByVideo));
    this.commentary = new Commentary();
    this.commentForm = new FormGroup({
      'subject': new FormControl(this.commentary.subject, Validators.required),
      'description': new FormControl(this.commentary.description, Validators.required)
    });
  }

  onSubmit() {
    this.commentary = this.commentForm.value
    this.apollo.mutate({
      mutation: CREATE_COMMENTARY,
      variables: {
        subject: this.commentary.subject,
        description: this.commentary.description,
        id_video: this.id_video,
        id_user: this.id_user
      }
    })
  }

}
