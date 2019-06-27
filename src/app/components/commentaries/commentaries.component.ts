import { Component, OnInit } from '@angular/core';
import { Query, Commentary, COMMENTARIES_BY_VIDEO, CREATE_COMMENTARY } from '../../models/commentary';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-commentaries',
  templateUrl: './commentaries.component.html',
  styleUrls: ['./commentaries.component.css']
})
export class CommentariesComponent implements OnInit {

  commentary: Commentary;
  commentForm: FormGroup;
  commentaries: any;
  id_video: string;


  constructor(private apollo: Apollo, private authService: AuthenticationService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      this.id_video = params.get('id');
    });
    this.commentary = new Commentary();
    this.commentForm = new FormGroup({
      subject: new FormControl(this.commentary.subject, Validators.required),
      description: new FormControl(this.commentary.description, Validators.required)
    });

    this.commentaries = this.apollo.watchQuery<Query>({
      query: COMMENTARIES_BY_VIDEO,
      variables: {
        id_video: this.id_video
      }
    }).valueChanges.subscribe((data) => {
      this.commentaries = data;
    }, (error) => {
      console.log(error);
    })
  }

  onSubmit() {
    this.authService.getUserData().then((response) => {
      this.commentary = this.commentForm.value;
      this.apollo.mutate({
        mutation: CREATE_COMMENTARY,
        variables: {
          subject: this.commentary.subject,
          description: this.commentary.description,
          id_video: this.id_video,
          id_user: response.validateToken.id
        }
      }).subscribe(({data})=>{
        this.commentForm.reset();
      }, (error) => {
        console.error(error);
      });
    });
  }

  get isAuthenticated(): boolean {
    return !(localStorage.getItem('token') == null);
  }

}
