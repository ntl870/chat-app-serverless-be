import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUserContext } from 'src/common/interfaces/user-context.interface';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<{ user: CurrentUserContext }>();

    return request.user;
  },
);
