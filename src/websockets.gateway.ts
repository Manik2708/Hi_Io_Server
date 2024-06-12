import { OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WebSocketMessageError } from './websocket_message_not_sent_error';
import { Inject } from '@nestjs/common';
import { InjectionTokens } from './injection_tokens';
import { createClient } from 'redis';

@WebSocketGateway()
export class WebSocketsGateWay implements OnGatewayInit<Server> {
  private url?: string;
  constructor(@Inject(InjectionTokens.RedisUrl) url: string){
    this.url = url;
  }
  afterInit(ioServer: Server) {
    ioServer.on('connection', async (socket) => {
      const client = createClient({
        url: this.url
      })
      await client.connect()
      const subscribe = client.duplicate()
      await subscribe.connect()
      console.log('Connection To Sockets Successful ' + socket.id);
      socket.on('subscribe', async (data)=>{
        await subscribe.SUBSCRIBE(data.userId, function (message){
          const event = JSON.parse(message)
          const socket = ioServer.sockets.sockets.get(event.id);
          if (socket == null) {
            throw new WebSocketMessageError();
          } else {
            try {
              socket.emitWithAck(event.name, event.data);
            } catch (e) {
              throw new WebSocketMessageError();
            }
          }
        })
      })
      socket.on('disconnect', async ()=>{
        await subscribe.disconnect()
        await client.disconnect()
      })
    });
  }
}