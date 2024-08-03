import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { config } from 'dotenv'

config()
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ACCESS_TOKEN_SECRET,
    })
  }

  validate(payload: any) {
    console.log('Inside JWT Strategy Validate')
    return payload
  }
}