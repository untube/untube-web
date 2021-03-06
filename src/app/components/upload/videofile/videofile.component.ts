import { Component, OnInit} from '@angular/core';
import {VideouploadService} from '../../../services/videoupload.service'
import { HttpClient, HttpEventType} from '@angular/common/http';
import {CREATE_VIDEO} from '../../../models/video'
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Category, Query, ALL_CATEGORIES } from 'src/app/models/category';
import {NotificationService} from '../../../services/notification.service'
import { map } from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { TokenQuery, IS_AUTHENTICATED } from 'src/app/models/token';


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
  uploadValue: number;
  fileText = document.getElementById("custom-text")
  videoText = "No se ha seleccionado ningun archivo"

  constructor(private service: VideouploadService,private http: HttpClient,private apollo: Apollo,private notification: NotificationService,private route: ActivatedRoute,private router: Router) { }

  categories = [

    {id: 1, value: 'Musica'},
    {id: 2, value: 'Cine'},
    {id: 3, value: 'Vloggs'},
    {id: 4, value: 'Video Juegos'},
    {id: 5, value: 'Otros'}

  ]

  ngOnInit() {

    this.fileText = document.getElementById("custom-text")
    this.service.initilizeFormGroup
    this.categories$ = this.apollo.watchQuery<Query>({ query: ALL_CATEGORIES}).valueChanges.pipe(map(result => result.data.allCategories));

      var token = localStorage.getItem('token')
      var uid = localStorage.getItem('uid')
      var client = localStorage.getItem('client')
  
      console.log(token,uid,client)
  
      this.apollo.watchQuery<TokenQuery>({ query: IS_AUTHENTICATED,
        variables: 
        {
          token,
          uid,
          client
        }
      }).valueChanges.pipe().subscribe(({data}) =>{
        console.log(data.validateToken.id)
        this.user_id = parseInt(data.validateToken.id)
      });

      this.uploadValue = 0
  }


  onFileSelected(event){

    console.log("Elegí Archivo")
    this.selectedFile = <File> event.target.files[0]
    console.log(this.selectedFile)
    if(this.selectedFile){
      console.log(this.selectedFile)
      this.videoText = this.selectedFile.name
    }
    else{
      this.videoText = "No se ha seleccionado ningun archivo"
    }

  }

 
  onUpload(){
    const fd = new FormData();

    //select name!


    var form = this.service.form.value

    var id_string = this.user_id
    var category_id = this.category_id
    var description = form.description
    var title = form.title

    fd.append('file',this.selectedFile,this.selectedFile.name);

   let headers = new Headers();
    /** No need to include Content-Type in Angular 4 */
   headers.append('Content-Type', 'multipart/form-data');
   headers.append('Accept', 'video/mp4')

   //var post_url = "http://35.196.3.185:3001/upload/" + id_string + "/" + category_id + "/" + title +"/" + description
   //var post_url = "/upload/" + id_string + "/" + category_id + "/" + title +"/" + description + "/" + localStorage.getItem('tokenFirebase')
   var post_url = "/upload/" + id_string + "/" + category_id + "/" + title +"/" + description

   this.http.post(post_url,fd,{
      reportProgress: true,
      observe: 'events'
    }).
    subscribe(event => {
      if(event.type === HttpEventType.UploadProgress){
        this.uploadValue = Math.round(event.loaded / event.total * 100 )
        console.log("Upload progress: " +  Math.round(event.loaded / event.total * 100 ) + '%');
        if(this.uploadValue == 100){
          this.notification.succes('Video Publicado')
          this.router.navigate(['/profile']);
        }
      }else if (event.type === HttpEventType.Response){
        console.log(event)
      }
      console.log(event)
    })
  }

  onClear(){
    this.service.form.reset()
    this.service.initilizeFormGroup;
    this.router.navigate(['/profile']);
  }

  onSubmit(){
    if(this.service.form.valid){

    }
    else{
      this.onClear()
    }
  }

  onSelect(category){
    this.category_id = category.id
  }


}
