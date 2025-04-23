import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { LoginDto } from '@@shared/dto/login.dto';
import { Public } from './constants';


@Controller('auth')
export class AuthController {
  @Inject() private readonly authService: AuthService;
  constructor() {}

  @Public()
  @Post('login')
  @ApiOkResponse()
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }
}
