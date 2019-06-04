import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { Query, Video, VIDEO_BY_ID } from '../shared/video';
import { WebsocketService } from '../websocket.service';

@Component({  
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.css']
})
export class VideoplayerComponent implements OnInit {

  videoId;
  video$: Observable <Video>;
  base: string = "";
  base64: string
  blob;
  blobURL;
  baseURL = "data:video/mp4;base64,"

  constructor(private route: ActivatedRoute,private apollo: Apollo , private wss: WebsocketService) { 

  }


  _base64ToArrayBuffer(base64) {
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
    let id = params.get('id');
    this.videoId = id;
    console.log(this.videoId)
  });

  this.video$ = this.apollo.watchQuery<Query>({ query: VIDEO_BY_ID,variables: {id: this.videoId}
  }).valueChanges.pipe(map(result => result.data.videoById));
  

  /*this.wss.GetInstanceStatus().subscribe((msg) => {
    var foo = msg.data
    this.base64 += foo

  }) */

  let socket = new WebSocket("ws://localhost:3002/ws");



  socket.onopen = () => {
      console.log("Successfully Connected");
      socket.send("Hi From the Client!")
  };
  
  socket.onclose = event => {
      console.log("Socket Closed Connection: ", event);
      socket.send("Client Closed!")
     // this.base64 = this.base
     // this.blob =  convertion(this.base64)
      this.base += "=="
      this.baseURL += this.base;
      console.log(this.baseURL)

      const blob = convertion(this.base);

      this.baseURL = URL.createObjectURL(blob);


  };

  socket.onmessage = (msg) => {
    this.base += msg.data 
  } 
    
  socket.onerror = error => {
      console.log("Socket Error: ", error);
  };


  function convertion(base64){

    var contentType = "video/mp4";
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {type: contentType});

    return blob
  
  }

}

}















