import { Injectable } from '@nestjs/common';
import { Chat } from './chat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChatDto } from './dto/chat.dto';
import { BaseService } from 'src/common/interfaces/base-service.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class ChatService implements BaseService<Chat> {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
    private readonly userService: UserService,
  ) {}

  async create(createDto: CreateChatDto) {
    try {
      const invitedUser = await this.userService.findById(
        createDto.invitedUserId,
      );
      const invitingUser = await this.userService.findById(
        createDto.invitingUserId,
      );

      const createdChat = await this.chatModel.create({
        messages: [],
        members: [invitedUser, invitingUser],
      });

      return await createdChat.save();
    } catch (e) {
      console.log(e);
    }
  }
}
