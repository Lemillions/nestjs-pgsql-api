import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, } from '@nestjs/websockets';
import { ChatsService } from 'src/chat/chat.service';
import { Chat } from '@prisma/client';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');
  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    console.log('message', payload);
    this.server.emit('msgToClient', {
      text: payload,
      createdAt: Date.now(),
    }, client.id);
  }

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

}
