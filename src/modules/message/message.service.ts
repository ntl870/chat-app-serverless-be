import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { CreateMessageDto } from './dto/message.dto';
import { Message } from './message.schema';
import { ChatService } from '../chat/chat.service';
import { SocketGateway } from '../socket/socket.gateway';
import { SocketService } from '../socket/socket.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    private readonly userService: UserService,
    private readonly chatService: ChatService,
    private readonly socketGateway: SocketGateway,
    private readonly socketService: SocketService,
  ) {}

  async sendMessage(senderId: string, createDto: CreateMessageDto) {
    const sender = await this.userService.findById(senderId);
    const isExisted = await this.chatService.isExistedInChat(
      senderId,
      createDto.chatId,
    );

    if (isExisted) {
      const createdMessage = await this.messageModel.create({
        sender,
        content: createDto.text,
        chatId: createDto.chatId,
      });

      const chat = await this.chatService.findById(createDto.chatId);

      const receiverIds = chat.members
        .filter((member) => String(member._id) !== String(senderId))
        .map((member) => String(member._id));

      await Promise.all(
        receiverIds.map(
          async (id) =>
            await this.emitSendMessageSocketEvent(id, createdMessage),
        ),
      );

      return createdMessage;
    } else {
      throw new BadRequestException('Not exist');
    }
  }

  async emitSendMessageSocketEvent(userId: string, message: Message) {
    const clients = await this.socketService.getClientIdByUserId(userId);

    clients.forEach((client) => {
      this.socketGateway.emitEvent<Message>(
        'message',
        client.clientId,
        message,
      );
    });
  }
}
