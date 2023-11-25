import { Prop, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../user/user.schema';
import { Message } from '../message/message.schema';

@Schema()
export class Chat extends mongoose.Document {
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  members: User[];

  @Prop([
    { type: mongoose.Schema.Types.ObjectId, ref: 'Message', required: false },
  ])
  messages: Message[];
}
