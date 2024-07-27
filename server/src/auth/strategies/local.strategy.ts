import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string) {
    console.log('Inside LocalStrategy');
    const user = await this.authService.login({ email, password });
    console.log({ user });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
