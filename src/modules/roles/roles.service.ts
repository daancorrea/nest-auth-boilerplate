import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ConflictError } from '../../common/errors/types';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './models/role.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel('Role') private readonly roleModel: Model<Role>) {}
  async create(createRoleDto: CreateRoleDto) {
    const role = await this.findByName(createRoleDto.name);
    if (role) throw new ConflictError('Role name already in use');
    return this.roleModel.create(createRoleDto);
  }

  private async findByName(name: string) {
    return this.roleModel.findOne({ name });
  }

  async findAll() {
    return this.roleModel.find().sort({ created_at: -1 });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    return this.roleModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: updateRoleDto },
    );
  }

  async delete(id: string) {
    return this.roleModel.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
    });
  }

  async convertNameArrayToIdArray(roleNames: string[]) {
    const roles = await this.roleModel.find({ name: { $in: roleNames } });
    return roles.map((role) => role._id);
  }
}
