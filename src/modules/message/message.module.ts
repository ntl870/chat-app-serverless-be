import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message } from './message.schema';
import { BaseSchema } from 'src/common/base.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: BaseSchema.getSchema(Message) },
    ]),
  ],
})
export class MessageModule {}
