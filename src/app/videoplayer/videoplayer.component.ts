import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { Query, Video, VIDEO_BY_ID } from '../shared/video';
import { WebsocketService } from '../websocket.service';
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

  let socket = new WebSocket("ws://localhost:3000/ws");


  /*
  socket.onopen = () => {
      console.log("Successfully Connected");
      socket.send("Hi From the Client!")
  };
  */

  socket.onclose = event => {
      console.log("Socket Closed Connection: ", event);
      socket.send("Client Closed!")
  };

  /*
  socket.onmessage = (msg) => {
    this.base += msg.data 
  } */
    
  socket.onerror = error => {
      console.log("Socket Error: ", error);
  };
  

  const video = document.querySelector('#video')
  const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';

  let mediaSource
  let sourceBuffer

  if('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)){

    mediaSource = new MediaSource()
    mediaSource.addEventListener('sourceopen',()=> {
      console.log('Media Source Open', mediaSource.readyState);
      sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
      sourceBuffer.addEventListener('updateend',() =>{
        mediaSource.endOfStream();
        console.log('Media Source UpdateEnd', mediaSource.readyState); //ended  
      });
    });
  }

  socket.onopen = () => {
    socket.onmessage = (event) => {
      if (typeof event.data === 'string') {
        console.log('receive string message', event.data);
      } else if(event.data instanceof Blob){
        console.log('receive blob message', event.data);
        if (this.mode === 0) {
          // Test data from server is valid buffer
          var image: HTMLImageElement
            image = document.querySelector("#image");
            image.src = window.URL.createObjectURL(event.data);
        } else if (this.mode === 1) {
          const videoUrl = window.URL.createObjectURL(event.data);
          get(videoUrl, (buffer) => {
            sourceBuffer.appendBuffer(buffer);
          });}
      }
    }
  }

  sourceBuffer.addEventListener('updateend',function(){

    if(this.queue.lenght){

      sourceBuffer.appendBuffer(this.queue.shift());

    }

  },false)


  function get(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'blob';
    xhr.send();
    xhr.onreadystatechange = () => {
      callback(xhr.response);
    };
  }


}

}



















