import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { VideolistComponent } from './components/videolist/videolist.component';
import { VideoplayerComponent } from './components/videoplayer/videoplayer.component';
import { MatInputModule, MatSelectModule, MatIconModule,MatToolbarModule, MatTabsModule, MatSidenavModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatVideoModule } from 'mat-video';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryvideolistComponent } from './components/categoryvideolist/categoryvideolist.component';
import {WebsocketService} from './services/websocket.service';
import { SearchComponent } from './components/search/search.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SearchlistComponent } from './components/searchlist/searchlist.component';
import { HeaderComponent } from './components/header/header.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CommentariesComponent } from './components/commentaries/commentaries.component';
import { UploadComponent } from './components/upload/upload.component';
import {MatCardModule,MatTableModule,} from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator'; 


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
    MatPaginatorModule
  ],
  exports: [

  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
