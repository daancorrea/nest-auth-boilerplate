import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { Hasher } from 'src/utils/hasher';

@Injectable()
export class UpdateUserPasswordService {
  constructor(
    @InjectModel(User.name)
    private readonly usersModel: Model<User>,
  ) {}

  async updatePassword(userId: string, password: string): Promise<User> {
    return this.usersModel
      .findByIdAndUpdate(userId, {
        $set: {
          password: await Hasher.makeHash(password),
        },
      })
      .populate('roles');
  }
}
