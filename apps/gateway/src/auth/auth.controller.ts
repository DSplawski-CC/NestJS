import { Body, Controller, Headers, Inject, Post, Res, Req, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { LoginDto } from '@@shared/dto/login.dto';
import { Public } from '@@gateway/auth/constants';
import { Response, Request } from 'express';
import { clearRefreshTokenCookie, setRefreshTokenCookie } from '@@shared/utils/cookie.utils';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, JwtToken } from '@@shared/utils/jwt.utils';


@Controller('auth')
export class AuthController {
  @Inject() private readonly authService: AuthService;
  @Inject() private readonly configService: ConfigService;
  @Inject() private readonly jwtService: JwtService;
  constructor() {}

  @Public()
  @Post('login')
  @ApiOkResponse()
  async signIn(@Body() loginDto: LoginDto, @Headers('user-agent') userAgent: string, @Res({ passthrough: true }) response: Response) {
    const { accessToken, refreshToken } = await this.authService.signIn(loginDto, userAgent);
    setRefreshTokenCookie(response, refreshToken, {
      secure: this.configService.get<boolean>('TOKEN_COOKIE_SECURE'),
      maxAge: this.jwtService.decode<JwtToken>(refreshToken).exp,
    })

    return { accessToken: accessToken };
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Headers('user-agent') userAgent: string,  @Res({ passthrough: true }) res: Response) {
    const token = req.cookies['refresh_token'];

    if (!token) {
      throw new ForbiddenException('No token found');
    }

    const { accessToken, refreshToken: newRefreshToken } = await this.authService.refresh(token, userAgent);
    setRefreshTokenCookie(res, newRefreshToken, {
      secure: this.configService.get<boolean>('TOKEN_COOKIE_SECURE'),
      maxAge: this.jwtService.decode<JwtToken>(newRefreshToken).exp,
    });
    return { accessToken };
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies['refresh_token'] as string;
    const userId = this.jwtService.decode<JwtToken>(refreshToken).sub;

    if (refreshToken) {
      await this.authService.logout(userId, refreshToken);
    }

    clearRefreshTokenCookie(res);

    return req.user;
  }
}
