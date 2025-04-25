import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@@users/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '@@shared/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { createJwtPayload } from '@@shared/utils/jwt.utils';


@Injectable()
export class AuthService {
  @Inject() private readonly userService: UserService;
  @Inject() private readonly jwtService: JwtService;

  constructor() {}

  async signIn(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userService.getFullUser(loginDto.email);

    if (!await bcrypt.compare(loginDto.password, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = createJwtPayload(user);
    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token: access_token
    }
  }
}
