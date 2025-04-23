import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SharedModule } from '@@shared/shared.module';


@Module({
  imports: [
    SharedModule.forRoot({ global: true }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
