import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginService } from '../services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly loginService: LoginService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(username: string, password: string) {
    return this.loginService.validateUser(username, password);
  }
}
