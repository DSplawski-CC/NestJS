import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewModule } from '@modules/review/review.module';
import { UserModule } from '@modules/user/user.module';
import { PrismaModule } from 'nestjs-prisma';


@Module({
  imports: [PrismaModule.forRoot({ isGlobal: true }), ReviewModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
