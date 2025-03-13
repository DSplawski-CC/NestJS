import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  public getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }
}
