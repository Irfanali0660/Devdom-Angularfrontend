import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatsocketService {

  private socket!: Socket;
  private options:SocketIoConfig = {
    url: environment.socketUrl+'',
    options: {
      path: '/chat',
      auth: {
        
      },
      transports: ['websocket']
    }
  };
  constructor() {
    
  }
  
  connect(q:any,auth?:{token:string}) {
    this.options.options = {...this.options.options, query : q,auth};
    this.socket = new Socket(this.options);
    console.log('connect!!');
   
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  on(eventName: string, callback: Function) {
    this.socket.on(eventName, callback);
    // this.socket.fromEvent(eventName).subscribe((message: unknown) => {callback(message)})
  }

  emit(eventName: string, data: any, callback?: Function) {
    // this.socket.ioSocket.io.query = {channelId}
    // this.socket.io('/my-namespace').query = { channelId };

    this.socket.emit(eventName, data, callback);
  }}
