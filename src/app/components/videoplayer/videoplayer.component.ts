import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { Query, Video, VIDEO_BY_ID } from '../../models/video';
import { QueryRecommendation,RECOMMENDATIONS_BY_USER,FEED_USER_DB,FEED_VIDEO_DB } from '../../models/recommendation';
import { WebsocketService } from '../../services/websocket.service';
import { TokenQuery, IS_AUTHENTICATED } from 'src/app/models/token';


@Component({  
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.scss']
})
export class VideoplayerComponent implements OnInit {

  mode: number = 1;
  videoId;
  video$: Observable <Video>;
  baseURL = "http://35.196.3.185:3002/watch";
  queue = [];
  src: String;
  id_user = 1;
  id_category: String;


  constructor(private route: ActivatedRoute,private apollo: Apollo , private wss: WebsocketService) { 

  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
    let id = params.get('id');
    this.videoId = id;
  });

  this.video$ = this.apollo.watchQuery<Query>(
    { query: VIDEO_BY_ID,
      variables: {
        id: this.videoId
      }
    }).valueChanges.pipe(
      map(result => result.data.videoById)
    )

      var token = localStorage.getItem('token')
      var uid = localStorage.getItem('uid')
      var client = localStorage.getItem('client')

      if (token != null){

        this.apollo.watchQuery<TokenQuery>({ query: IS_AUTHENTICATED,
          variables: 
          {
            token,
            uid,
            client
          }
        }).valueChanges.pipe().subscribe(({data}) =>{
          this.id_user = parseInt(data.validateToken.id)
          this.apollo.watchQuery<Query>(
            { query: VIDEO_BY_ID,
              variables: {
                id: this.videoId
              }
            }).valueChanges.pipe().subscribe(({data}) => {
              this.id_category = data.videoById.category_id
              //Mutation to feed recommendations

              this.apollo.mutate({
                mutation: FEED_VIDEO_DB,
                variables: {
                  id_video: this.videoId,
                  id_category: this.id_category,
                  calification: 1
                }
              }).subscribe(({data}) => {console.log('got data',data);});  
              
              //Mutation to feed recommendations

              this.apollo.mutate({
                mutation: FEED_USER_DB,
                variables: {
                  id_user: this.id_user,
                  id_category: this.id_category,
                }
              }).subscribe(({data}) => {console.log('got data',data);});


            });

            });

      }else if (token == null){

        this.apollo.watchQuery<Query>(
          { query: VIDEO_BY_ID,
            variables: {
              id: this.videoId
            }
          }).valueChanges.pipe().subscribe(({data}) => {
            this.id_category = data.videoById.category_id

            //Mutation to feed recommendations

            this.apollo.mutate({
              mutation: FEED_VIDEO_DB,
              variables: {
                id_video: this.videoId,
                id_category: this.id_category,
                calification: 1
              }
            }).subscribe(({data}) => {console.log('got data',data);});
            
            //Mutation to feed recommendations

            this.apollo.mutate({
              mutation: FEED_USER_DB,
              variables: {
                id_user: this.id_user,
                id_category: this.id_category,
              }
            }).subscribe(({data}) => {console.log('got data',data);});
        });
    }

      
  }

  get isAuthenticated(): boolean {
    return !(localStorage.getItem('token') == null);
  }

}



















