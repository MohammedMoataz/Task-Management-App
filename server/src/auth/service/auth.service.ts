import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { plainToClass } from 'class-transformer';
import { config } from 'dotenv';

import { UserService } from 'src/services/user/user.service';
import { compareHashedData } from 'src/utils/helper';
import { Tokens } from 'src/utils/types';
import { LoginDto, SignUpDto } from './../dto/auth.dto';
import { CreateUserDto, UserDto } from 'src/DTOs/user.dto';
import { UserSchema } from 'src/schemas/user.schema';

config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

@Injectable()
export class AuthService {
  jwtOptions: { secret: string; verify: { algorithms: string[] } };
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    this.jwtOptions = {
      secret: ACCESS_TOKEN_SECRET,
      verify: { algorithms: ['HS256'] },
    };
  }

  async signIn(loginDto: LoginDto): Promise<Tokens> {
    const user = await this.userService.findOneByEmail(loginDto.email);
    if (user && user.get('password') == loginDto.password)
      console.log({ user });
    else return null;

    // const isPasswordMatchs = await compareHashedData(
    //   loginDto.password,
    //   user.password_hash,
    // );
    // if (!isPasswordMatchs) return null;

    const tokens = await this.getTokens(user);

    // await this.userService.updateRefreshToken(user.uuid, tokens.refresh_token);

    return tokens;
  }

  login(user: { username: any; userId: any }) {
    const payload = { username: user.username, sub: user.userId };

    return { access_token: this.jwtService.sign(payload, this.jwtOptions) };
  }

  async signUp(signupDto: SignUpDto): Promise<Tokens> {
    const user = await this.userService.create(
      plainToClass(CreateUserDto, signupDto),
    );

    return await this.getTokens(user);
  }

  async updateRefreshToken(id: string, refresh_token: string): Promise<any> {
    const user = await this.userService.findOneById(id);
    if (!user) throw new UnauthorizedException('User is not authorized');

    // const isRefreshTokenMatches = await compareHashedData(refresh_token, user.refresh_token)
    // if (!isRefreshTokenMatches) throw new UnauthorizedException("User is not authorized")

    const tokens = await this.getTokens(user);
    // await this.userService.updateRefreshToken(user.uuid, tokens.refresh_token);

    return tokens;
  }

  async logout(id: string): Promise<string> {
    await this.userService.updateRefreshToken(id, null);
    return 'Logged out successfully';
  }

  private async getTokens(user: UserSchema | UserDto): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { payload: plainToClass(UserDto, user) },
        {
          expiresIn: '1h',
          secret: ACCESS_TOKEN_SECRET,
        },
      ),
      this.jwtService.signAsync(
        { payload: plainToClass(UserDto, user) },
        {
          expiresIn: '1h',
          secret: REFRESH_TOKEN_SECRET,
        },
      ),
    ]);

    return { access_token: at, refresh_token: rt };
  }
}
