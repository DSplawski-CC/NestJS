import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import { CreateUserDto } from '@modules/user/user.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  public async getUser(@Param('id') id: string) {
    return await this.userService.getUser(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createUser(@Body() user: CreateUserDto) {
    return await this.userService.addUser(user);
  }
}
