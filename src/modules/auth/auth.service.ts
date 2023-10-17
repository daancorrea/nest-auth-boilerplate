import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConflictError } from 'src/common/errors/types';
import { UsersService } from '../user/users.service';
import { RegisterDto } from './dto/register.dto';
import { Hasher } from 'src/utils/hasher';
import { User } from '../user/models/user.model';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(email: string, pass: string): Promise<string> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await this.checkPassword(pass, user.password)))
      throw new UnauthorizedException('Invalid Credentials');
    return this.createAccessToken(user);
  }

  async createAccessToken(user: User): Promise<string> {
    const payload = {
      email: user.email,
      name: user.name,
      sub: user._id,
      roles: user.roles.map((role) => role.name),
    };
    return sign(payload, this.configService.get('JWT_SECRET'), {
      expiresIn: this.configService.get('JWT_EXPIRATION'),
    });
  }

  private async checkPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await Hasher.compareHash(password, hashedPassword);
  }

  async register(registerDto: RegisterDto): Promise<string> {
    const user = await this.usersService.findByEmail(registerDto.email);
    if (user) throw new ConflictError('User already exists');
    console.log(registerDto);
    const newUser = await this.usersService.create(registerDto);
    await this.createAccessToken(newUser);
    return 'User created successfully';
  }
}
