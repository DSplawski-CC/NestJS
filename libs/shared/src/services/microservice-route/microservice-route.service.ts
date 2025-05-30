import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { lastValueFrom } from 'rxjs';


export type MicroServiceRequest = Pick<Request, 'params' | 'query' | 'body' | 'headers'>

interface PatternOptions {
  cmd: string;
}

@Injectable()
export class MicroserviceRouteService {
  constructor(private readonly client: ClientProxy) {}

  async send<T extends any = any>(pattern: PatternOptions, request: MicroServiceRequest) {
    const payload: MicroServiceRequest = {
      params: request.params,
      query: request.query,
      body: request.body,
      headers: request.headers,
    };

    return lastValueFrom(this.client.send<T>(pattern, payload));
  }
}

