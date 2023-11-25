import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class SocketService implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() private server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log(args);
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  handleConnectionError(client: any, error: Error) {
    console.error(`Error for client ${client.id}: ${error.message}`);
  }

  emitEvent<T>(event: string, data: T) {
    this.server.emit(event, data);
  }

  onEvent<T>(event: string, callback: (data: T) => void) {
    this.server.on(event, callback);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log(`Message received from ${client.id}: ${payload}`);
    return 'Hello from server!';
  }
}
