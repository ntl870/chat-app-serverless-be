import { Prop, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../user/user.schema';

@Schema({ timestamps: true })
export class Message extends mongoose.Document {
  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' })
  chatId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  sender: User;
}
