import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { Query, Video, VIDEO_BY_ID } from '../shared/video';
import {StreamService} from '../stream.service';

@Component({  
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.css']
})
export class VideoplayerComponent implements OnInit {

  public videoId;
  video$: Observable <Video>;
  constructor(private route: ActivatedRoute,private apollo: Apollo , private streamService: StreamService) { 
    streamService.message.subscribe(msg => {
      console.log("Response From WebSocket Server:" + msg );
    })
  }

  private message = {
    author: 'Harry Potter',
    message: 'I am the new dark Lord'
  }

  sendMsg(){
    console.log("New Message Sent from Client ");
    this.streamService.message.next(this.message);
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
    let id = params.get('id');
    this.videoId = id;
    console.log(this.videoId)
  });

  console.log(this.video$)


  this.video$ = this.apollo.watchQuery<Query>({ query: VIDEO_BY_ID,variables: {id: this.videoId}
  }).valueChanges.pipe(map(result => result.data.videoById));
  

  console.log(this.video$)

}



}










