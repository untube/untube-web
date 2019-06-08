import { Component, OnInit } from '@angular/core';
import {VideouploadService} from '../../../services/videoupload.service'
import { HttpClient, HttpEventType} from '@angular/common/http';
import {MatDialogRef} from '@angular/material'
import {Video} from '../../../models/video'

@Component({
  selector: 'app-videofile',
  templateUrl: './videofile.component.html',
  styleUrls: ['./videofile.component.css']
})
export class VideofileComponent implements OnInit {
  selectedFile: File;

  constructor(private service: VideouploadService,private http: HttpClient
    ,public dialogRef: MatDialogRef<VideofileComponent>) { }

  categories = [

    {id: 1, value: 'Musica'},
    {id: 2, value: 'Cine'},
    {id: 3, value: 'Vloggs'},
    {id: 4, value: 'Video Juegos'},
    {id: 5, value: 'Otros'}

  ]

  ngOnInit() {
  }


  onFileSelected(event){

    this.selectedFile = <File> event.target.files[0]
    console.log(event)

  }

 
  onUpload(){
    const fd = new FormData();
    fd.append('file',this.selectedFile,this.selectedFile.name);

    //let headers = new Headers();
    /** No need to include Content-Type in Angular 4 */
    //headers.append('Content-Type', 'multipart/form-data');
    //headers.append('Accept', 'image/png')

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
  }

  onClose(){
    this.service.form.reset();
    this.service.initilizeFormGroup;
    this.dialogRef.close()
  }

  onSubmit(){
    if(this.service.form.valid){
      var video = new Video()
      video = this.service.form.value
      this.service.form.reset()
    }
  }

}
