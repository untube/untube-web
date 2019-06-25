import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { VideolistComponent } from './components/videolist/videolist.component';
import { VideoplayerComponent } from './components/videoplayer/videoplayer.component';
import { MatInputModule, MatSelectModule, MatIconModule,MatToolbarModule, MatTabsModule, MatSidenavModule,MatFormFieldModule,MatSnackBarModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatVideoModule } from 'mat-video';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryvideolistComponent } from './components/categoryvideolist/categoryvideolist.component';
import {WebsocketService} from './services/websocket.service';
import {VideouploadService} from './services/videoupload.service'
import { SearchComponent } from './components/search/search.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SearchlistComponent } from './components/searchlist/searchlist.component';
import { HeaderComponent } from './components/header/header.component';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CommentariesComponent } from './components/commentaries/commentaries.component';
import { UploadComponent } from './components/upload/upload.component';
import {MatCardModule,MatTableModule,} from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatDialogModule} from '@angular/material/dialog'
import {VideofileComponent} from './components/upload/videofile/videofile.component';
import {AuthGuardService} from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    VideolistComponent,
    VideoplayerComponent,
    CategoriesComponent,
    CategoryvideolistComponent,
    SearchComponent,
    SearchlistComponent,
    HeaderComponent,
    SignInComponent,
    SignUpComponent,
    UploadComponent,
    VideofileComponent,
    CommentariesComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,    
    MatInputModule, 
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatVideoModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatListModule,
    FlexLayoutModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
  exports: [

  ], 
  providers: [WebsocketService, VideouploadService, AuthGuardService],
  bootstrap: [AppComponent],
  entryComponents: [VideofileComponent]
})
export class AppModule { }
