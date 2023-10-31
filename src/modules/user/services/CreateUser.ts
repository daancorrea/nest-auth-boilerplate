import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { RolesService } from 'src/modules/roles/roles.service';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { Hasher } from 'src/utils/hasher';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectModel(User.name)
    private readonly usersModel: Model<User>,
    private readonly rolesService: RolesService,
  ) {}

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
}
