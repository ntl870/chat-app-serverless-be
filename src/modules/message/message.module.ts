import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message } from './message.schema';
import { BaseSchema } from 'src/common/base.schema';
import { MessageService } from './message.service';
import { UserModule } from '../user/user.module';
import { MessageController } from './message.controller';
import { AuthModule } from '../auth/auth.module';
import { ChatModule } from '../chat/chat.module';
import { SocketModule } from '../socket/socket.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: BaseSchema.getSchema(Message) },
    ]),
    UserModule,
    ChatModule,
    SocketModule,
    AuthModule,
  ],
  providers: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
