import { Injectable } from '@nestjs/common';
import { SocketGateway } from './modules/socket/socket.gateway';

@Injectable()
export class AppService {
  constructor(private readonly socketGateway: SocketGateway) {}

  getHello() {
    this.socketGateway.emitEvent('message', '', 'Hello from server!');
    return 'aaa';
  }
}
