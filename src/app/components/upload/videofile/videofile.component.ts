import { Component, OnInit, Inject, EventEmitter,Output} from '@angular/core';
import {VideouploadService} from '../../../services/videoupload.service'
import { HttpClient, HttpEventType} from '@angular/common/http';
import {MatDialogRef} from '@angular/material'
import {Video,CREATE_VIDEO} from '../../../models/video'
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Category, Query, ALL_CATEGORIES } from 'src/app/models/category';
import {NotificationService} from '../../../services/notification.service'
import { map } from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material'


@Component({
  selector: 'app-videofile',
  templateUrl: './videofile.component.html',
  styleUrls: ['./videofile.component.css']
})
export class VideofileComponent implements OnInit {
  
  selectedFile: File;
  categories$: Observable<Category[]>;
  user_id: number; 
  category_id : string

  constructor(private service: VideouploadService,private http: HttpClient
    ,public dialogRef: MatDialogRef<VideofileComponent>,private apollo: Apollo,private notification: NotificationService,private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  categories = [

    {id: 1, value: 'Musica'},
    {id: 2, value: 'Cine'},
    {id: 3, value: 'Vloggs'},
    {id: 4, value: 'Video Juegos'},
    {id: 5, value: 'Otros'}

  ]

  ngOnInit() {
    this.service.initilizeFormGroup
    this.categories$ = this.apollo.watchQuery<Query>({ query: ALL_CATEGORIES}).valueChanges.pipe(map(result => result.data.allCategories));
    this.user_id = this.data.user_id
  }


  onFileSelected(event){

    this.selectedFile = <File> event.target.files[0]
    console.log(event)

  }

 
  onUpload(){
    const fd = new FormData();
    fd.append('file',this.selectedFile,this.selectedFile.name);

   // let headers = new Headers();
    /** No need to include Content-Type in Angular 4 */
   // headers.append('Content-Type', 'multipart/form-data');
   // headers.append('Accept', 'video/mp4')

    this.http.post('http://localhost:3000/upload',fd,{
      reportProgress: true,
      observe: 'events'
    }).
    subscribe(event => {
      if(event.type === HttpEventType.UploadProgress){
        console.log("Upload progress: " +  Math.round(event.loaded / event.total * 100 ) + '%');
      }else if (event.type === HttpEventType.Response){
        console.log(event)
      }
      console.log(event)
    })
  }

  onClear(){
    this.service.form.reset()
    this.service.initilizeFormGroup;
    this.onClose();

  }

  onClose(){
    this.service.form.reset();
    this.service.initilizeFormGroup;
    this.dialogRef.close()
  }

  onSubmit(){
    if(this.service.form.valid){
      var form : any;
      var video = new Video()
      video.user_id = this.user_id
      form = this.service.form.value
      video.title = form.title
      video.category_id = this.category_id
      video.description = form.description
      video.destination = "/movie"
      console.log(video)
     // this.onUpload();
      this.newVideo(video)
      this.service.form.reset()
      this.service.initilizeFormGroup
      this.onClose();
    }
  }

  onSelect(category){

    this.category_id = category.id

  }


  newVideo(video) {
    this.apollo.mutate({
      mutation: CREATE_VIDEO,
      variables: {
        user_id: video.user_id,
        category_id: video.category_id,
        title: video.title,
        destination: video.destination,
        description: video.description
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
      this.notification.succes('::Carga Exitosa')
    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }

}
