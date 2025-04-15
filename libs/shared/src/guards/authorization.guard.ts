import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';


@Injectable()
export class AuthorizationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    if (!request.headers['x-token']) {
      throw new UnauthorizedException('Missing required header: x-token');
    }
    return true;
  }
}
