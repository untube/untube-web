import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class WebsocketService {
  private websocket: any;


  public sendMessage(text:string){
    this.websocket.send(text);
  }
  public GetInstanceStatus(): Observable<any>{
    var reader = new FileReader();
    this.websocket = new WebSocket("ws://localhost:3000/ws");
    
    return fromEvent(this.websocket,'message').pipe(map((response: string) => {
       // logic here for determining if res is a blob based on headers
       // here is what you'd do for a blob though:
       return response
      }));
    }
  sendText(json: Object) {
    this.websocket.send(json);
  }
  sendBinary(bytes: any) {
    this.websocket.send(bytes);
  }
}