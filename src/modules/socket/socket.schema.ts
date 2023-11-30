import * as mongoose from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';
import { User } from '../user/user.schema';

@Schema({ timestamps: true })
export class Socket extends mongoose.Document {
  @Prop()
  clientId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}
