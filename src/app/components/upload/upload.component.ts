import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { UploadService } from  '../../services/upload.service';
import { Apollo } from 'apollo-angular';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog'
import { HttpClient, HttpEventType} from '@angular/common/http';
import {MAT_DIALOG_DATA} from '@angular/material'
import { Video, CREATE_VIDEO, DELETE_VIDEO, Query, ALL_VIDEOS, VIDEOS_BY_USER } from '../../models/video';
import { VideofileComponent } from './videofile/videofile.component';
import { NotificationService } from 'src/app/services/notification.service';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { RootContext } from '@angular/core/src/render3/interfaces/view';
import { Route, ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  form: FormGroup;
  error: string;
  uploadResponse = { status: '', message: '', filePath: '' };
  selectedFile: File;
   
  page = 0;
  size = 4;

  videos: Observable<any[]>;
  videos$: Observable<Video[]>;
  user_id: number


  categories = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];

  constructor(private formBuilder: FormBuilder, private uploadService: UploadService,private fb: FormBuilder, 
    private apollo: Apollo,private http: HttpClient, private dialog: MatDialog,private notification: NotificationService,private route: ActivatedRoute) {

  }


  ngOnInit() {


    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.user_id = parseInt(id);
      console.log(this.user_id)
      this.videos$ = this.apollo.watchQuery<Query>({ query: VIDEOS_BY_USER,variables: {id: this.user_id}
      }).valueChanges.pipe(map(result => result.data.videosByName));
  
      console.log(this.videos$)
  
  
      });


    /*this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.user_id = parseInt(id);

      console.log(this.user_id)
      });
    this.videos$ = this.apollo.watchQuery<Query>({query: ALL_VIDEOS}).valueChanges.pipe(map(result => result.data.allVideos));
    this.getData({pageIndex: this.page, pageSize: this.size});*/
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
        this.notification.succes('::Borrado Exitoso')
      },(error) => {
        console.log('there was an error sending the query', error);
      });
    } 
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {user_id: this.user_id}
    this.dialog.open(VideofileComponent,dialogConfig)
  }

}














