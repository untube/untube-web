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
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { MessagingService } from './shared/messaging.service';
import { environment } from '../environments/environment';
import { AsyncPipe } from '../../node_modules/@angular/common';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';

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
    CommentariesComponent,
    RecommendationsComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
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
    MatProgressBarModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  exports: [

  ], 
  providers: [MessagingService, AsyncPipe,WebsocketService, VideouploadService, AuthGuardService],
  bootstrap: [AppComponent],
  entryComponents: [VideofileComponent]
})
export class AppModule { }
