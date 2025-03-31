import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

interface PayloadData {
  params?: Request['params'];
  query?: Request['query'];
  body?: Request['body'];
  headers?: Request['headers'];
}

function getPayload(ctx: ExecutionContext): PayloadData {
  return ctx.switchToRpc().getData<PayloadData>();
}

/**
 * Route handler parameter decorator. Extracts the `params`
 * property from the `payload` object and populates the decorated
 * parameter with the value of `params`. May also apply pipes to the bound
 * parameter.
 *
 * For example, extracting all params:
 * ```typescript
 * findOne(@PayloadParam() params: string[])
 * ```
 *
 * For example, extracting a single param:
 * ```typescript
 * findOne(@PayloadParam('id') id: string)
 * ```
 *
 * @param property name of single property to extract from the `payload` object
 * @param pipes one or more pipes - either instances or classes - to apply to
 * the bound parameter.
 *
 * @see {@link PayloadData}
 * @see [Request object](https://docs.nestjs.com/controllers#request-object)
 * @see [Working with pipes](https://docs.nestjs.com/custom-decorators#working-with-pipes)
 *
 * @publicApi
 */
export const PayloadParam = createParamDecorator(
  (param: string | undefined, ctx: ExecutionContext) => {
    const payload = getPayload(ctx);
    return param
      ? payload?.params?.[param]
      : payload?.params;
  },
);


/**
 * Route handler parameter decorator. Extracts the `query`
 * property from the `payload` object and populates the decorated
 * parameter with the value of `query`. May also apply pipes to the bound
 * query parameter.
 *
 * For example:
 * ```typescript
 * async find(@PayloadQuery('user') user: string)
 * ```
 *
 * @param property name of single property to extract from the `query` object
 * @param pipes one or more pipes to apply to the bound query parameter
 *
 * @see {@link PayloadData}
 * @see [Request object](https://docs.nestjs.com/controllers#request-object)
 *
 * @publicApi
 */

export const PayloadQuery = createParamDecorator(
  (param: string | undefined, ctx: ExecutionContext) => {
    const payload = getPayload(ctx);
    return param
      ? payload?.query?.[param]
      : payload?.query;
  },
);

/**
 * Route handler parameter decorator. Extracts the entire `body`
 * object from the `req` object and populates the decorated
 * parameter with the value of `body`.
 *
 * For example, extracting entire body:
 * ```typescript
 * async create(@Body() createDto: CreateCatDto)
 * ```
 *
 * For example, extracting single property:
 * ```typescript
 * async create(@Body('id') createDto: CreateCatDto)
 * ```
 *
 * For example, apply pipes to the bound body parameter:
 * ```typescript
 * async create(@Body(new ValidationPipe()) createDto: CreateCatDto)
 * ```
 *
 * @see {@link PayloadData}
 * @see [Request object](https://docs.nestjs.com/controllers#request-object)
 *
 * @publicApi
 */

export const PayloadBody = createParamDecorator(
  (param: string, ctx: ExecutionContext) => {
    const payload = getPayload(ctx);
    return param
      ? payload?.body?.[param]
      : payload?.body;
  },
);