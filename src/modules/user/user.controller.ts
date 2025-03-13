import { Controller, Get, Param } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UserService } from '@modules/user/user.service';
import { UserResponseDto } from '@modules/user/user.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  public getUser(@Param('id') id: string) {
    const userEntity = this.userService.getUser(id);
    return plainToInstance(UserResponseDto, userEntity);
  }
}
