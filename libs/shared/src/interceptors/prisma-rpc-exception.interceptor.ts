import {
  BadRequestException,
  CallHandler, ConflictException,
  ExecutionContext,
  Injectable, InternalServerErrorException,
  NestInterceptor, NotFoundException,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';
import { Prisma } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';


export interface PrismaError {
  readonly type: 'PRISMA_ERROR';
  readonly code: string;
  readonly message: string;
}

@Injectable()
export class PrismaRpcExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          return throwError(
            () =>
              new RpcException({
                type: 'PRISMA_ERROR',
                code: err.code,
                message: err.message,
              } as PrismaError),
          );
        }
        return throwError(() => err);
      }),
    );
  }
}

@Injectable()
export class RpcToHttpExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (typeof error === 'object' && error?.type === 'PRISMA_ERROR') {
          switch (error.code) {
            case 'P2025':
              return throwError(() => new NotFoundException(error.message));
            case 'P2002':
              return throwError(() => new ConflictException(error.message));
            default:
              return throwError(() => new BadRequestException(error.message));
          }
        }

        return throwError(() => new InternalServerErrorException(error?.message || 'Microservice Error'));
      }),
    );
  }
}