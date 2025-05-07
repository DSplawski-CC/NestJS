import {
  CanActivate,
  ExecutionContext, Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '@@gateway/auth/constants';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { JwtToken } from '@@shared/utils/jwt.utils';


@Injectable()
export class AuthorizationGuard implements CanActivate {
  @Inject() private readonly configService: ConfigService;
  @Inject() private readonly jwtService: JwtService;
  @Inject() private readonly reflector: Reflector;

  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = String(this.extractTokenFromHeader(request));
    const secret = this.configService.get('JWT_ACCESS_SECRET');

    try {
      const payload = await this.jwtService.verifyAsync<JwtToken>(
        token,
        {
          secret: secret,
        }
      );

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];

    return type === 'Bearer'
      ? token
      : undefined;
  }
}
