import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieDbService {
  getHello(): string {
    return 'Hello World!';
  }
}
