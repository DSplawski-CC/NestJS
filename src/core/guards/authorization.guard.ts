import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';


@Injectable()
export class AuthorizationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    console.log(request.headers);
    if (!request.headers['x-token']) {
      throw new UnauthorizedException('Missing required header: x-token');
    }
    return true;
  }
}