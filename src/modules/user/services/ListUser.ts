import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { paginationMeta } from 'src/utils/pagination-meta';

@Injectable()
export class ListUserService {
  constructor(
    @InjectModel(User.name)
    private readonly usersModel: Model<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return this.usersModel.findOne({ email }).populate('roles');
  }

  public async findAll(skip = 0, limit?: number) {
    const findQuery = this.usersModel
      .find()
      .sort({ created_at: -1 })
      .populate('roles')
      .skip(skip);
    if (limit) findQuery.limit(limit);
    const data = await findQuery;
    const total = await this.usersModel.countDocuments();
    return { data, meta: paginationMeta(skip, limit, total) };
  }

  async findById(userId: string): Promise<User> {
    const user = await this.usersModel.findById(userId).populate('roles');
    return user;
  }

  async findByIds(ids: string[]): Promise<User[]> {
    return this.usersModel.find({
      _id: { $in: ids },
    });
  }
}
