import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideolistComponent } from './components/videolist/videolist.component';
import { VideoplayerComponent } from './components/videoplayer/videoplayer.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryvideolistComponent } from './components/categoryvideolist/categoryvideolist.component';
import { SearchlistComponent} from './components/searchlist/searchlist.component';
import { SignInComponent} from './components/sign-in/sign-in.component';
import { SignUpComponent} from './components/sign-up/sign-up.component';
import { UploadComponent } from './components/upload/upload.component';
import { CommentariesComponent } from './components/commentaries/commentaries.component';
import { VideofileComponent } from './components/upload/videofile/videofile.component';
import { AuthGuardService as AuthGuard, AuthGuardService } from './services/auth-guard.service';
const routes: Routes = [

  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'commentaries', component: CommentariesComponent},
  {path: 'home',component: VideolistComponent},
  {path: 'watch/:id', component: VideoplayerComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'categories/:id', component: CategoryvideolistComponent},
  {path: 'search/:name', component: SearchlistComponent},
  {path: 'profile', component: UploadComponent},
  {path: 'profile/upload', component: VideofileComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



