import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { config } from 'dotenv';

import { UserService } from 'src/services/user/user.service';
import { SignUpDto } from '../dto/auth.dto';

config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: SignUpDto) {
    return this.userService.findOneByEmail(payload.email);
  }
}
