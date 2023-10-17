import {
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { PaginationParams } from 'src/common/validators/pagination-params';
import ParamsWithId from '../../common/validators/params-with-id';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findById(@Param() params: ParamsWithId) {
    return this.usersService.findById(params.id);
  }

  @Get()
  @Roles('patetao')
  @ApiOkResponse({ description: 'Lista de usuários retornada com sucesso' })
  async findAll(@Query() query: PaginationParams) {
    const { skip, limit } = query;
    return this.usersService.findAll(skip, limit);
  }

  @Put(':id')
  async update(
    @Param() params: ParamsWithId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(params.id, updateUserDto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOkResponse({ description: 'Usuário removido com sucesso' })
  async remove(@Param() params: ParamsWithId) {
    return this.usersService.remove(params.id);
  }
  @Get('search/:email')
  async getUserByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }
}
