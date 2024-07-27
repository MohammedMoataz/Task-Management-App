import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/services/user/user.service';
import { compareHashedData, verifyRefreshToken } from 'src/utils/helper';
import { Tokens } from 'src/utils/types';
import { LoginDto, SignUpDto } from './../dto/auth.dto';
import { UserDto } from 'src/DTOs/user.dto';
import { UserSchema } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {
  jwtOptions: { secret: string; verify: { algorithms: string[] } };
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    this.jwtOptions = {
      secret: 'ACCESS_TOKEN_SECRET',
      verify: { algorithms: ['HS256'] },
    };
  }

  async login(loginDto: LoginDto): Promise<Tokens> {
    const user = await this.userService.findOneByEmail(loginDto.email);
    if (!user) return null;

    const isPasswordMatchs = await compareHashedData(
      loginDto.password,
      user.get('password'),
    );
    if (!isPasswordMatchs) return null;

    user.set('refresh_token', null)
    const tokens = await this.getTokens(user);

    await this.userService.updateRefreshToken(user._id, tokens.refresh_token);

    return tokens;
  }

  async signUp(signupDto: SignUpDto): Promise<Tokens> {
    const user = await this.userService.create(signupDto);
    return await this.getTokens(user['_doc']);
  }

  async updateRefreshToken(id: string, refresh_token: string): Promise<any> {
    const user = await this.userService.findOneById(id);
    if (!user) throw new UnauthorizedException('User is not authorized');

    const verifieduser = verifyRefreshToken(refresh_token, (err, user) => {
      if (err) throw new UnauthorizedException('User is not authorized');

      return user;
    });

    console.log({ verifieduser })
    const tokens = await this.getTokens(user);
    await this.userService.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(id: string): Promise<string> {
    await this.userService.updateRefreshToken(id, null);
    return 'Logged out successfully';
  }

  private async getTokens(user: UserSchema | UserDto): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { payload: user },
        {
          expiresIn: '1h',
          secret: 'ACCESS_TOKEN_SECRET',
        },
      ),
      this.jwtService.signAsync(
        { payload: user },
        {
          expiresIn: '1h',
          secret: 'REFRESH_TOKEN_SECRET',
        },
      ),
    ]);

    return { access_token: at, refresh_token: rt };
  }
}
