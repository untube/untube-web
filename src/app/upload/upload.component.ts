import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { UploadService } from  '../upload.service';
import { Category, Query, ALL_CATEGORIES } from '../shared/category';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Video, CREATE_VIDEO } from '../shared/video';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  title = "Video de Prueba  ";
  category = "Other";
  angForm: FormGroup;
  form: FormGroup;
  error: string;
  userId: number = 1;
  description: string = "Nada Especial"
  //video =  new Video;
  uploadResponse = { status: '', message: '', filePath: '' };
  categories$: Observable<Category[]>;

  categories = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];

  constructor(private formBuilder: FormBuilder, private uploadService: UploadService,private fb: FormBuilder, private apollo: Apollo) {
    this.createForm();
  }


  ngOnInit() {
    this.categories$ = this.apollo.watchQuery<Query>({ query: ALL_CATEGORIES}).valueChanges.pipe(map(result => result.data.allCategories));
    this.form = this.formBuilder.group({
      video: ['']
    });
  }
  
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('video').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('video').value);

    this.uploadService.upload(formData, this.userId).subscribe(
      (res) => this.uploadResponse = res,
      (err) => this.error = err
    );
      

  }

  createForm() {
   this.angForm = this.fb.group({
      title: ['', Validators.required ],
      category: ['', Validators.required ]

   });
  }

  createVideo(video) {
    this.apollo.mutate<Query>({
      mutation: CREATE_VIDEO,
      variables: {
        video
      }
    }).subscribe((response) => {
  
    });
  }


}









