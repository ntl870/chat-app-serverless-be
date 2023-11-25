import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';
import { BaseService } from 'src/common/interfaces/base-service.interface';

@Injectable()
export class UserService implements BaseService<User> {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll() {
    return await this.userModel.find().exec();
  }

  async create(createDto: CreateUserDto) {
    return await this.userModel.create(createDto);
  }

  async findByEmailPassword(email: string, password: string) {
    const user = await this.userModel.findOne({ email, password }).exec();
    return user;
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  async findById(id: string) {
    return await this.userModel.findById(id).select('-password').exec();
  }
}
