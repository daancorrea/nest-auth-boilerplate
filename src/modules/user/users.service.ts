import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hasher } from 'src/utils/hasher';
import { paginationMeta } from '../../utils/pagination-meta';
import { RegisterDto } from '../auth/dto/register.dto';
import { RolesService } from '../roles/roles.service';
import { User, UserDocument } from './models/user.model';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly usersModel: Model<UserDocument>,
    private readonly rolesService: RolesService,
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

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.usersModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async create(registerDto: RegisterDto): Promise<User> {
    const rolesArr = await this.rolesService.convertNameArrayToIdArray(
      registerDto.roles,
    );
    return await this.usersModel.create({
      ...registerDto,
      password: await Hasher.makeHash(registerDto.password),
      roles: rolesArr,
    });
  }

  async updatePassword(userId: string, password: string): Promise<User> {
    return this.usersModel
      .findByIdAndUpdate(userId, {
        $set: {
          password: await Hasher.makeHash(password),
        },
      })
      .populate('roles');
  }

  async findByIds(ids: string[]): Promise<User[]> {
    return this.usersModel.find({
      _id: { $in: ids },
    });
  }

  async remove(userId: string): Promise<User> {
    return this.usersModel.findByIdAndDelete(userId);
  }
}
