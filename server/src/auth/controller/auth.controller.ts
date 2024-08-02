import {
  Body,
  Controller,
  Delete,
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
} from '@nestjs/common'
import { Request } from 'express'

import { LoginDto, SignUpDto } from '../DTO/auth.dto'
import { Tokens } from 'src/utils/types'
import { CreateUserInterceptor } from 'src/interceptors/user.interceptor'
import { AuthService } from '../service/auth.service'
import { LocalGuard } from '../guards/local.guard'
import { JwtAuthGuard } from '../guards/jwt.guard'
import { plainToClass } from 'class-transformer'

@Controller()
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    console.log({ req: req.body })
    return req.body
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    console.log('Inside AuthController status method')
    return req.body
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  @UsePipes(ValidationPipe)
  @UseInterceptors(CreateUserInterceptor)
  async signup(@Body() signUpDto: SignUpDto): Promise<Tokens> {
    const newUser = plainToClass(SignUpDto, signUpDto)
    console.log(newUser)

    return this.authService.signUp(newUser)
  }

  @Post('signin')
  async signIn(@Body() loginDto: LoginDto): Promise<Tokens> {
    const tokens = this.authService.login(loginDto)

    if (!tokens) throw new UnauthorizedException('Wrong email or password')
    else return tokens
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post('refreshtoken')
  async refreshToken(@Req() req: Request) {
    const user = req.body
    console.log({ userController: user })
    return this.authService.updateRefreshToken(
      user.id,
      user.refresh_token,
    )
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Delete('logout')
  async logout(@Req() req: Request): Promise<string> {
    const user = req.body
    return this.authService.logout(user['id'])
  }
}
