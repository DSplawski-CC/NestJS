import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY, JWT_SECRET } from '../../../../apps/auth/src/constants';
import { Reflector } from '@nestjs/core';


@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

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

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: JWT_SECRET
        }
      );

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.get('authorization')?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
