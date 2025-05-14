import { ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@@users/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '@@shared/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { createJwtPayload, getExpirationDate, JwtPayload, JwtToken } from '@@shared/utils/jwt.utils';
import { ConfigService } from '@nestjs/config';
import { TokensDto } from '@@shared/dto/token.dto';
import { PrismaClientProviderService } from '@@shared/services/prisma-client-provider/prisma-client-provider.service';
import { pick } from 'lodash';


@Injectable()
export class AuthService {
  @Inject() private readonly configService: ConfigService;
  @Inject() private readonly userService: UserService;
  @Inject() private readonly jwtService: JwtService;
  @Inject() private readonly prismaProvider: PrismaClientProviderService;

  constructor() {}

  private get prisma() {
    return this.prismaProvider.getClient();
  }

  async signIn(loginDto: LoginDto, userAgent: string) {
    const user = await this.validateAndGetUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = createJwtPayload(user);

    const tokenDto = await this.getToken(payload);
    await this.saveRefreshToken(user.id, tokenDto.refreshToken, userAgent);

    return tokenDto;
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
          expiresIn: Number(this.configService.get<number>('JWT_ACCESS_EXPIRATION_TIME')),
        }
      ),
      this.jwtService.signAsync(payload,
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: Number(this.configService.get<number>('JWT_REFRESH_EXPIRATION_TIME')),
        }
      ),
    ]);

    return { accessToken, refreshToken };
  }

  async saveRefreshToken(userId: number, token: string, userAgent: string) {
    const hashed = await bcrypt.hash(token, 10);
    const jwtToken = this.jwtService.decode<JwtToken>(token)
    const expiresAt = getExpirationDate(jwtToken);

    return this.prisma.refreshToken.create({
      data: {
        userId,
        tokenHash: hashed,
        userAgent,
        createdAt: new Date(),
        expiresAt,
      },
    });
  }

  async refresh(refreshToken: string, userAgent: string) {
    const jwtToken = await this.jwtService.verifyAsync<JwtToken>(refreshToken, { secret: this.configService.get<string>('JWT_REFRESH_SECRET') });
    const payload = pick(jwtToken, 'sub', 'email', 'username');
    const oldTokenDto = await this.getUserTokenData(payload.sub, refreshToken);

    if (!oldTokenDto) {
      throw new ForbiddenException('Invalid refresh token');
    }

    await this.revokeToken(oldTokenDto.id);
    const { accessToken, refreshToken: newRefreshToken } = await this.getToken(payload);
    await this.saveRefreshToken(payload.sub, newRefreshToken, userAgent);

    return { accessToken, refreshToken: newRefreshToken };
  }

  private async revokeToken(tokenId: bigint | number) {
    await this.prisma.refreshToken.update({
      where: { id: tokenId },
      data: { revokedAt: new Date(), lastUsedAt: new Date() },
    });
  }

  async logout(userId: number, refreshToken: string) {
    const tokenDto = await this.getUserTokenData(userId, refreshToken);

    if (!tokenDto) {
      throw new ForbiddenException('Invalid refresh token');
    }

    await this.revokeToken(tokenDto.id);
  }

  private async getUserTokenData(userId: number, refreshToken: string) {
    const tokens = await this.prisma.refreshToken.findMany({
      where: {
        userId,
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
    });


    let refreshTokenMatched = false;

    for (const token of tokens) {
      refreshTokenMatched = await bcrypt.compare(refreshToken, token.tokenHash);

      if (refreshTokenMatched) {
        return token;
      }
    }

    return null;
  }
}
