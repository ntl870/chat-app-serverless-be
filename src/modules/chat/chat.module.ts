import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BaseSchema } from 'src/common/base.schema';
import { Chat } from './chat.schema';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: BaseSchema.getSchema(Chat) },
    ]),
    UserModule,
    AuthModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
