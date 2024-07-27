import {
  Body,
  Controller,
  Get,
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
import { LocalGuard } from '../guards/local.guard';
import { JwtAuthGuard } from '../guards/jwt.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    console.log(req.user);
    return req.user;
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    console.log('Inside AuthController status method');
    return req.user;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  @UsePipes(ValidationPipe)
  @UseInterceptors(CreateUserInterceptor)
  async signup(@Body() signUpDto: SignUpDto): Promise<Tokens> {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  async signIn(@Body() loginDto: LoginDto): Promise<Tokens> {
    const tokens = this.authService.login(loginDto);

    if (!tokens) throw new UnauthorizedException('Wrong email or password');
    else return tokens;
  }

  @HttpCode(HttpStatus.OK)
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
