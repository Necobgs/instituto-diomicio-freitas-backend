import { Injectable } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService {
  constructor(private readonly gateway: NotificationGateway) {}

  notifyUser(userId: number, payload: unknown) {
    this.gateway.notifyUser(userId, payload);
  }
}

