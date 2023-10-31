import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.model';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from '../roles/roles.module';
import {
  DeleteUserService,
  ListUserService,
  UpdateUserPasswordService,
  UpdateUserService,
} from './services';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    RolesModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    DeleteUserService,
    ListUserService,
    UpdateUserPasswordService,
    UpdateUserService,
  ],
  exports: [
    UsersService,
    DeleteUserService,
    ListUserService,
    UpdateUserPasswordService,
    UpdateUserService,
  ],
})
export class UsersModule {}
