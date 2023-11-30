import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { SocketGateway } from './socket.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { BaseSchema } from 'src/common/base.schema';
import { Socket } from './socket.schema';
import { SocketService } from './socket.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Socket.name, schema: BaseSchema.getSchema(Socket) },
    ]),
    AuthModule,
    UserModule,
  ],
  providers: [SocketGateway, SocketService],
  exports: [SocketGateway, SocketService],
})
export class SocketModule {}
