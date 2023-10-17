import {
  Body,
  Controller,
  Param,
  Put,
  Get,
  Delete,
  Post,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import MongooseClassSerializerInterceptor from 'src/common/transformer/mongooseClassSerializer.interceptor';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './models/role.model';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller('roles')
@UseInterceptors(MongooseClassSerializerInterceptor(Role))
@UseGuards(JwtAuthGuard)
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @Get()
  async findAll() {
    return this.roleService.findAll();
  }

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.roleService.delete(id);
  }
}
