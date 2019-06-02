import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {WebsocketService} from './websocket.service';
import {environment} from '../environments/environment';
import {map} from 'rxjs/operators';
 

export interface Message {
  author: string,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  public message: Subject<Message>;

  constructor(private wsService: WebsocketService) {

    this.message = <Subject<Message>>wsService.connect(environment.STREAM_URL).pipe(
    map((response: MessageEvent): Message =>{
      let data = JSON.parse(response.data);
      return {
        author: data.author,
        message: data.message
      }
    }));

   }
}
