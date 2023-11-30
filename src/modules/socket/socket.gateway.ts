import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { SocketService } from './socket.service';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly authService: AuthService,
    private readonly socketService: SocketService,
  ) {}

  @WebSocketServer() private server: Server;

  async handleConnection(client: Socket) {
    const authToken: string = client.handshake.auth.token;
    const authTokenResult = await this.authService.authenticateToken(authToken);
    if (!authTokenResult.isAuthorized) {
      this.emitEvent('unauthorized', client.id, {
        message: 'Unauthorized',
      });

      client.disconnect(true);
    } else {
      await this.socketService.createSocketSession(
        authTokenResult.payload._id,
        client.id,
      );
    }
  }

  async handleDisconnect(client: Socket) {
    await this.socketService.removeSocketSession(client.id);
  }

  handleConnectionError(client: Socket, error: Error) {
    console.error(`Error for client ${client.id}: ${error.message}`);
  }

  emitEvent<T>(event: string, clientId: string, data: T) {
    this.server.to(clientId).emit(event, data);
  }

  onEvent<T>(event: string, callback: (data: T) => void) {
    this.server.on(event, callback);
  }
}
