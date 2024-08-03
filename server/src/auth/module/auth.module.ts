import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { config } from 'dotenv'

import { UserModule } from 'src/modules/user/user.module'
import { AuthController } from '../controller/auth.controller'
import { AuthService } from '../service/auth.service'
import { LocalStrategy } from '../strategies/local.strategy'
import { JwtStrategy } from '../strategies/jwt.strategy'

config()
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [PassportModule, JwtModule, AuthService],
})
export class AuthModule { }
