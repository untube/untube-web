import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Video} from '../../models/video';
import {Router} from '@angular/router';
import {QueryRecommendation, RECOMMENDATIONS_BY_USER} from '../../models/recommendation';
import {TokenQuery, IS_AUTHENTICATED} from '../../models/token';
@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {

  id_user =  1;
  videos$: Observable<Video[]>;


  constructor(private router: Router, private apollo: Apollo) { }

  ngOnInit() {

    var token = localStorage.getItem('token')
    var uid = localStorage.getItem('uid')
    var client = localStorage.getItem('client')

    if(token == null){
      this.videos$ = this.apollo.watchQuery<QueryRecommendation>(
        { query: RECOMMENDATIONS_BY_USER,
          variables: {
            code: this.id_user
          }
        }).valueChanges.pipe(
          map(result => result.data.recommendationsByUser)
        );
    }
    else{

      this.apollo.watchQuery<TokenQuery>({ query: IS_AUTHENTICATED,
        variables: 
        {
          token,
          uid,
          client
        }
      }).valueChanges.pipe().subscribe(({data}) =>{

        this.id_user = parseInt(data.validateToken.id)
        this.videos$ = this.apollo.watchQuery<QueryRecommendation>(
          { query: RECOMMENDATIONS_BY_USER,
            variables: {
              code: this.id_user
            }
          }).valueChanges.pipe(
            map(result => result.data.recommendationsByUser)
          );
      })

    }

  }


  onSelect(video){
    this.router.navigate(['/watch',video.id]);
  }

}
