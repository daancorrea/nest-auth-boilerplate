import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../../user/models/user.model';
import { sign } from 'jsonwebtoken';

@Injectable()
export class CreateAccessTokenService {
  constructor(private readonly configService: ConfigService) {}

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
}
