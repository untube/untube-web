import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Query, Video,ALL_VIDEOS } from '../../models/video';
import {Router} from '@angular/router';

@Component({
  selector: 'app-videolist',
  templateUrl: './videolist.component.html',
  styleUrls: ['./videolist.component.scss']
})

export class VideolistComponent implements OnInit{

  videos$: Observable<Video[]>;

  actualPage: number = 1;

  constructor(private router: Router, private apollo: Apollo){ }

  ngOnInit() {
    this.videos$ = this.apollo.watchQuery<Query>({query: ALL_VIDEOS}).valueChanges.pipe(map(result => result.data.allVideos));
    console.log(localStorage.getItem('uid'))
  }

  onSelect(video){
    this.router.navigate(['/watch',video.id]);
  }

  refresh(): void {
    window.location.reload();
  }

}



