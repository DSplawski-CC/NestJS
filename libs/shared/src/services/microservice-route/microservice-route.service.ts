import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { lastValueFrom } from 'rxjs';


interface PatternOptions {
  cmd: string;
}

@Injectable()
export class MicroserviceRouteService {
  constructor(@Inject('MICROSERVICE_CLIENT') private readonly client: ClientProxy) {}

  async send(pattern: PatternOptions, request: Request): Promise<void> {
    const payload = {
      params: request.params,
      query: request.query,
      body: request.body,
      headers: request.headers,
    };

    return lastValueFrom(this.client.send(pattern, payload));
  }
}
