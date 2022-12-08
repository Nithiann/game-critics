import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface Token {
  name: string,
  role: any,
  id: string,
}

export const InjectToken = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const response = ctx.switchToHttp().getResponse();
    return response.locals.token;
  },
);
