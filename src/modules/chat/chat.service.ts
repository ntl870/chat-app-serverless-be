import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Chat } from './chat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChatDto } from './dto/chat.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class ChatService {
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
      return new InternalServerErrorException(e);
    }
  }

  async isExistedInChat(userId: string, chatId: string): Promise<boolean> {
    const chat = await this.chatModel.findOne({
      _id: chatId,
    });

    return chat.members.some((member) => String(member._id) === userId);
  }

  async findById(chatId: string): Promise<Chat> {
    return await this.chatModel.findById(chatId);
  }
}
