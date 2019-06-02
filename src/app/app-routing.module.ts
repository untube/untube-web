import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideolistComponent } from './videolist/videolist.component';
import { VideoplayerComponent } from './videoplayer/videoplayer.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryvideolistComponent } from './categoryvideolist/categoryvideolist.component';
import { SearchlistComponent} from './searchlist/searchlist.component';
import { SignInComponent} from './sign-in/sign-in.component'

const routes: Routes = [

  {path: 'sign-in', component: SignInComponent},
  {path: 'home',component: VideolistComponent},
  {path: 'watch/:id', component: VideoplayerComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'categories/:id', component: CategoryvideolistComponent},
  {path: 'search/:name', component: SearchlistComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
