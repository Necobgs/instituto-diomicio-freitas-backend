import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: '/notifications',
  cors: {
    origin: '*',
  },
})
@Injectable()
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(NotificationGateway.name);

  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('subscribe')
  handleSubscribe(
    @MessageBody() data: { userId: number },
    @ConnectedSocket() client: Socket,
  ) {
    if (!data?.userId) {
      return;
    }

    const room = this.getUserRoom(data.userId);
    client.join(room);
    this.logger.log(`Client ${client.id} joined room ${room}`);
  }

  notifyUser(userId: number, payload: unknown) {
    const room = this.getUserRoom(userId);
    this.server.to(room).emit('notification', payload);
  }

  private getUserRoom(userId: number) {
    return `user:${userId}`;
  }
}

