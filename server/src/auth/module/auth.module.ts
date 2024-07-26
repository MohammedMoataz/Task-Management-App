import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { config } from 'dotenv';

import { AuthService } from 'src/auth/service/auth.service';
import { AuthController } from 'src/auth/controller/auth.controller';
import { UserModule } from 'src/modules/user/user.module';

config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

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
  providers: [AuthService],
  exports: [JwtModule, PassportModule],
})
export class AuthModule { }
