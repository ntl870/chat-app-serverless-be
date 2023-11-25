import { Injectable } from '@nestjs/common';
import { SocketService } from './modules/socket/socket.service';

@Injectable()
export class AppService {
  constructor(private readonly socketService: SocketService) {}

  getHello() {
    this.socketService.emitEvent('message', 'Hello from server!');
    return 'aaa';
  }
}
