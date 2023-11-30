import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Socket } from './socket.schema';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';

@Injectable()
export class SocketService {
  constructor(
    @InjectModel(Socket.name) private socketModel: Model<Socket>,
    private readonly userService: UserService,
  ) {}

  async createSocketSession(userId: string, clientId: string) {
    const user = await this.userService.findById(userId);

    return await this.socketModel.create({
      user,
      clientId,
    });
  }

  async removeSocketSession(clientId: string) {
    return await this.socketModel.findOneAndDelete({
      clientId,
    });
  }

  async getClientIdByUserId(userId: string) {
    return await this.socketModel.find({
      user: {
        _id: userId,
      },
    });
  }
}
