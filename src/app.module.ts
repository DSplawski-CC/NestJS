import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewModule } from '@modules/review/review.module';


@Module({
  imports: [ReviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
