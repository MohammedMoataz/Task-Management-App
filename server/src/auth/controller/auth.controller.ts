import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';

import { LoginDto, SignUpDto } from '../DTO/auth.dto';
import { Tokens } from 'src/utils/types';
import { CreateUserInterceptor } from 'src/interceptors/user.interceptor';
import { AuthService } from '../service/auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  @UsePipes(ValidationPipe)
  @UseInterceptors(CreateUserInterceptor)
  async signup(@Body() signUpDto: SignUpDto): Promise<Tokens> {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  async signIn(@Body() loginDto: LoginDto): Promise<Tokens> {
    const tokens = this.authService.signIn(loginDto);

    if (!tokens) throw new UnauthorizedException('Wrong email or password');
    else return tokens;
  }

  @HttpCode(HttpStatus.OK)
  // @UseGuards(RTGuard)
  @Post('refreshtoken')
  async refreshToken(@Req() req: Request) {
    const user = req.body.user;
    return this.authService.updateRefreshToken(
      user['id'],
      user['refresh_token'],
    );
  }

  @HttpCode(HttpStatus.OK)
  // @UseGuards(RTGuard)
  @Post('logout')
  async logout(@Req() req: Request): Promise<string> {
    const user = req.body.user;
    return this.authService.logout(user['id']);
  }
}
