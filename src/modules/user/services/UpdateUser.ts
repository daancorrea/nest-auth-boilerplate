import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UpdateUserService {
  constructor(
    @InjectModel(User.name)
    private readonly usersModel: Model<User>,
  ) {}

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.usersModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }
}
