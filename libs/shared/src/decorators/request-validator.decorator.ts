import { Type, UnprocessableEntityException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { Request } from 'express';

export function ValidateRequestBody<T extends object>(dto: Type<T>): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const request: Request | undefined = args.find(
        arg => arg?.body !== undefined && arg?.headers && arg?.method
      );

      if (!request) {
        throw new Error('ValidateRequestBody: Could not find Request object in arguments.');
      }

      const transformed = plainToInstance(dto, request.body);

      try {
        await validateOrReject(transformed, {
          whitelist: true,
          forbidNonWhitelisted: true,
        });
      } catch (errors) {
        throw new UnprocessableEntityException({
          message: 'Validation failed for request body',
          errors,
        });
      }

      request.body = transformed;

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}