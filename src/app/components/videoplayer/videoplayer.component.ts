import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { Query, Video, VIDEO_BY_ID } from '../../models/video';
import { WebsocketService } from '../../services/websocket.service';
import { Socket } from 'dgram';
import { queue } from 'rxjs/internal/scheduler/queue';

@Component({  
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.css']
})
export class VideoplayerComponent implements OnInit {

  mode: number = 1;
  videoId;
  video$: Observable <Video>;
  base: string = "";
  base64: string
  blob;
  blobURL;
  baseURL = "data:video/mp4;base64,";
  queue = [];

  constructor(private route: ActivatedRoute,private apollo: Apollo , private wss: WebsocketService) { 

  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
    let id = params.get('id');
    this.videoId = id;
    console.log(this.videoId)
  });

  this.video$ = this.apollo.watchQuery<Query>({ query: VIDEO_BY_ID,variables: {id: this.videoId}
  }).valueChanges.pipe(map(result => result.data.videoById));
  

  }




}



















