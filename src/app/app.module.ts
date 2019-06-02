import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { VideolistComponent } from './videolist/videolist.component';
import { VideoplayerComponent } from './videoplayer/videoplayer.component';
import { MatInputModule, MatSelectModule, MatIconModule,MatToolbarModule, MatTabsModule, MatSidenavModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatVideoModule } from 'mat-video';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryvideolistComponent } from './categoryvideolist/categoryvideolist.component';
import {WebsocketService} from './websocket.service';
import {StreamService} from './stream.service';
import { SearchComponent } from './search/search.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SearchlistComponent } from './searchlist/searchlist.component';
import { HeaderComponent } from './header/header.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';




@NgModule({
  declarations: [
    AppComponent,
    VideolistComponent,
    VideoplayerComponent,
    CategoriesComponent,
    CategoryvideolistComponent,
    SearchComponent,
    SearchlistComponent,
    HeaderComponent
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
    FlexLayoutModule
  ],
  exports: [
    MatTabsModule,
    MatSidenavModule
  ],
  providers: [WebsocketService,StreamService],
  bootstrap: [AppComponent]
})
export class AppModule { }
