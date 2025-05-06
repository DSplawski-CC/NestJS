import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '@@shared/utils/jwt.utils';
import e from 'express';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

  constructor(configService: ConfigService) {
    super({
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET')!,
    });
  }
  authenticate(req: e.Request, options?: any) {
    super.authenticate(req, options);
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username, email: payload.email };
  }
}
