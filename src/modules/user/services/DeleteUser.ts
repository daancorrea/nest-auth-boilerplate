import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';

@Injectable()
export class DeleteUserService {
  constructor(
    @InjectModel(User.name)
    private readonly usersModel: Model<User>,
  ) {}

  async delete(userId: string): Promise<User> {
    return this.usersModel.findByIdAndDelete(userId);
  }
}
