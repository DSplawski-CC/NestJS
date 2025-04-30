import { Body, Controller, Inject, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { LoginDto } from '@@shared/dto/login.dto';
import { Public } from '@@gateway/auth/constants';


@Controller('auth')
export class AuthController {
  @Inject() private readonly authService: AuthService;
  constructor() {}

  @Public()
  @Post('login')
  @ApiOkResponse()
  signIn(@Request() req: any) {
    return this.authService.signIn(req.user as LoginDto);
  }

  @Post('logout')
  async logout(@Request() req) {
    return req.user;
  }
}
