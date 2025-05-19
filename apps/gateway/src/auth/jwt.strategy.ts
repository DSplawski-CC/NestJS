import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '@@shared/utils/jwt.utils';
import { Request } from 'express';
import { UserResponseDto } from '@@shared/dto/user.dto';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET')!,
    });
  }
  authenticate(req: Request, options?: any) {
    super.authenticate(req, options);
  }

  async validate(payload: JwtPayload) {
    return { id: payload.sub, name: payload.username, email: payload.email } as UserResponseDto;
  }
}
