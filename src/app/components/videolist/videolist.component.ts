import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Query, Video,ALL_VIDEOS } from '../../models/video';
import {Router} from '@angular/router';
import { refreshDescendantViews } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-videolist',
  templateUrl: './videolist.component.html',
  styleUrls: ['./videolist.component.css']
})

export class VideolistComponent implements OnInit{

  videos$: Observable<Video[]>;

  constructor(private router: Router, private apollo: Apollo){ }

  ngOnInit() {
    this.videos$ = this.apollo.watchQuery<Query>({query: ALL_VIDEOS}).valueChanges.pipe(map(result => result.data.allVideos));
  }

  onSelect(video){
    this.router.navigate(['/watch',video.id]);
  }

  refresh(): void {
    window.location.reload();
  }

}



