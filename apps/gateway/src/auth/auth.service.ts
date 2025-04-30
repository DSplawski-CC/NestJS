import { ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@@users/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '@@shared/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { createJwtPayload, JwtPayload } from '@@shared/utils/jwt.utils';
import { ConfigService } from '@nestjs/config';
import { TokensDto } from '@@shared/dto/token.dto';


@Injectable()
export class AuthService {
  @Inject() private readonly configService: ConfigService;
  @Inject() private readonly userService: UserService;
  @Inject() private readonly jwtService: JwtService;

  constructor() {}

  async signIn(loginDto: LoginDto) {
    const user = await this.validateAndGetUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = createJwtPayload(user);

    return await this.getToken(payload);
  }

  async validateAndGetUser(userId: string, pass: string) {
    const user = await this.userService.getFullUser(userId);

    if (!await bcrypt.compare(pass, user.password)) {
      return null;
    }

    const{ password, ...result } = user;

    return result
  }

  async getToken(payload: JwtPayload): Promise<TokensDto> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload,
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: 30,
        }
      ),
      this.jwtService.signAsync(payload,
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: 60,
        }
      ),
    ]);

    return { accessToken, refreshToken };
  }
  //
  // async refreshTokens(userId: string, refreshToken: string): Promise<TokensDto> {
  //   const user = await this.userService.getUser(userId);
  //   const tokenMatches = await bcrypt.compare(refreshToken, user.hashedRefreshToken);
  //
  //   if (!tokenMatches) {
  //     throw new ForbiddenException('Invalid refresh token');
  //   }
  //
  //   const tokens = await this.getToken(user.id, user.email);
  //   await this.userService.updateRefreshToken(user.id, tokens.refreshToken); // rotate
  //   return tokens;
  // }
}
