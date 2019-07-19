import { Component, OnInit } from '@angular/core';
import { FormBuilder} from  '@angular/forms';
import { UploadService } from  '../../services/upload.service';
import { Apollo } from 'apollo-angular';
import {MatDialog} from '@angular/material/dialog'
import { HttpClient} from '@angular/common/http';
import { Video,DELETE_VIDEO, Query,VIDEOS_BY_USER } from '../../models/video';
import { AuthGuardService } from '../../services/auth-guard.service'
import { NotificationService } from 'src/app/services/notification.service';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import {TokenQuery,IS_AUTHENTICATED,Token} from '../../models/token';
import {DELETE_VB} from '../../models/recommendation';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  error: string;
  uploadResponse = { status: '', message: '', filePath: '' };
   
  page = 0;
  size = 4;

  videos: Observable<any[]>;
  videos$: Observable<Video[]>;
  user_id: number;
  token$: Observable<Token>;

  constructor(private formBuilder: FormBuilder, private uploadService: UploadService,private fb: FormBuilder,private auth: AuthGuardService,
    private apollo: Apollo,private http: HttpClient, private dialog: MatDialog,private notification: NotificationService,private route: ActivatedRoute,private router: Router) {

  }


  ngOnInit() {


    var token = localStorage.getItem('token')
    var uid = localStorage.getItem('uid')
    var client = localStorage.getItem('client')

    this.apollo.watchQuery<TokenQuery>({ query: IS_AUTHENTICATED,
      variables: 
      {
        token,
        uid,
        client
      }
    }).valueChanges.pipe().subscribe(({data}) =>{
      this.user_id = parseInt(data.validateToken.id)
      this.videos$ = this.apollo.watchQuery<Query>({ query: VIDEOS_BY_USER,variables: {id: this.user_id}
      }).valueChanges.pipe(map(result => result.data.videosByUser));

    });

  }

  getData(obj) {
    let index=0,
        startingIndex=obj.pageIndex * obj.pageSize,
        endingIndex=startingIndex + obj.pageSize;

    this.videos = this.videos$.pipe(filter(() => {
      index++;
      return (index > startingIndex && index <= endingIndex) ? true : false;
    }));
  }

  onDelete(videoId){
    console.log("Delete Video with Id:"+ videoId)

    if(confirm('Esta Seguro de querer eliminar el video?')){
      this.apollo.mutate({
        mutation: DELETE_VIDEO,
        variables: {
          id: videoId,
        }
      }).subscribe(({ data }) => {
        console.log('got data', data);
        this.notification.succes('Video Eliminado')
      },(error) => {
        console.log('there was an error sending the mutation', error);
      });

      this.apollo.mutate({
        mutation: DELETE_VB,
        variables:{
          id: videoId
        }
      }).subscribe(({data}) => {
        console.log(data)
      },(error) => {
        console.log('there was an error sending the mutation', error);
      });
    } 

  }

  onCreate(){
   this.router.navigate(['/profile/upload']);
  }

}














