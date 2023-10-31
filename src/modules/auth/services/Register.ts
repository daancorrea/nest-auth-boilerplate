import { Injectable } from '@nestjs/common';
import { ListUserService, CreateUserService } from '../../user/services';
import { ConflictError } from 'src/common/errors/types';
import { RegisterDto } from '../dto/register.dto';
import { CreateAccessTokenService } from './CreateAccessToken';

@Injectable()
export class RegisterService {
  constructor(
    private readonly listUserService: ListUserService,
    private readonly createUserService: CreateUserService,
    private readonly createAccessTokenService: CreateAccessTokenService,
  ) {}

  async register(registerDto: RegisterDto): Promise<string> {
    const user = await this.listUserService.findByEmail(registerDto.email);
    if (user) throw new ConflictError('User already exists');
    console.log(registerDto);
    const newUser = await this.createUserService.create(registerDto);
    await this.createAccessTokenService.createAccessToken(newUser);
    return 'User created successfully';
  }
}
