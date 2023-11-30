import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class WebSocketAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient();
    const authToken: string | undefined = client.handshake.auth.token;

    if (!authToken) {
      throw new WsException('Unauthorized');
    }

    const authResult = await this.authService.authenticateToken(authToken);

    if (!authResult.isAuthorized) {
      throw new WsException('Unauthorized');
    }

    return true;
  }
}
