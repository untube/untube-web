import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideolistComponent } from './videolist/videolist.component';
import { VideoplayerComponent } from './videoplayer/videoplayer.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryvideolistComponent } from './categoryvideolist/categoryvideolist.component';
import { SearchlistComponent} from './searchlist/searchlist.component';
import { SignInComponent} from './sign-in/sign-in.component';
import { SignUpComponent} from './sign-up/sign-up.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [

  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'home',component: VideolistComponent},
  {path: 'watch/:id', component: VideoplayerComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'categories/:id', component: CategoryvideolistComponent},
  {path: 'search/:name', component: SearchlistComponent},
  {path: 'profile/:id/upload-video', component: UploadComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



