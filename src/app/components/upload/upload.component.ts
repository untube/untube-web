import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { UploadService } from  '../../services/upload.service';
import { Category, Query, ALL_CATEGORIES } from '../../models/category';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { HttpClient, HttpEventType} from '@angular/common/http';

import { Video, CREATE_VIDEO } from '../../models/video';
import { headersToString } from 'selenium-webdriver/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  uploadedFiles: Array<File>;
  category = "Other";
  form: FormGroup;
  error: string;
  userId: number = 1;
  uploadResponse = { status: '', message: '', filePath: '' };
  categories$: Observable<Category[]>;
  uploadForm: FormGroup;
  selectedFile: File;
  user_id: number 
  category_id: string;
  description: string;
  destination: string;
  title: string


  categories = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];

  constructor(private formBuilder: FormBuilder, private uploadService: UploadService,private fb: FormBuilder, private apollo: Apollo,private http: HttpClient) {

  }


  ngOnInit() {
    this.categories$ = this.apollo.watchQuery<Query>({ query: ALL_CATEGORIES}).valueChanges.pipe(map(result => result.data.allCategories));
    this.form = this.formBuilder.group({
      video: ['']
    });
  }
  


  OnFileSelected(event){

    this.selectedFile = <File> event.target.files[0]
    console.log(event)

  }

  OnUpload(){
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
  
  newVideo() {
    this.apollo.mutate({
      mutation: CREATE_VIDEO,
      variables: {
        user_id: this.user_id,
        category_id: this.category_id,
        title: this.title,
        destination: this.destination,
        description: this.description
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }
}














