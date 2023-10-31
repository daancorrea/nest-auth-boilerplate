import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ListUserService } from '../../user/services';
import { CreateAccessTokenService } from './CreateAccessToken';
import { Hasher } from 'src/utils/hasher';

@Injectable()
export class LoginService {
  constructor(
    private readonly listUserService: ListUserService,
    private readonly createAccessTokenService: CreateAccessTokenService,
  ) {}

  async validateUser(email: string, pass: string): Promise<string> {
    const user = await this.listUserService.findByEmail(email);
    if (!user || !(await this.checkPassword(pass, user.password)))
      throw new UnauthorizedException('Invalid Credentials');
    return this.createAccessTokenService.createAccessToken(user);
  }
  private async checkPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await Hasher.compareHash(password, hashedPassword);
  }
}
