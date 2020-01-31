import { Injectable, ErrorHandler } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { WebsocketService } from './websocket.service';
import { map } from 'rxjs/operators';
import { Message } from '../message';
import { environment } from './../../environments/environment';

const URL = 'ws://' + environment.my_server_ip + ':8765/';

@Injectable({
  providedIn: 'root'
})
export class ConectaService {


   public stream_msg: Subject<Message> = new Subject<Message>();

    constructor(wsService: WebsocketService) { 
        const wsSubject = wsService.connect(URL);
    
        this.stream_msg = <Subject<Message>>wsSubject.pipe(map(
            (response: MessageEvent): Message => {
                const data = JSON.parse(response.data);
                return data;
            })
        );
    }

    send(msg: Message) {
      
        console.log('send ok');
        console.log(`msg : ${JSON.stringify(msg)}`);
    
        this.stream_msg.next(msg);
    }


}
