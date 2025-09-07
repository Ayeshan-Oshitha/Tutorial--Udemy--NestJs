import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { REQUEST_USER_KEY } from '../constants/auth.constants';

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserData | undefined, ctx: ExecutionContext) => {
    // field is a parameter that we can pass to the decorator
    // If `field` is provided, the decorator returns only that specific value
    // Otherwise, it returns the entire ActiveUserData object

    const request = ctx.switchToHttp().getRequest();
    const user: ActiveUserData = request[REQUEST_USER_KEY];

    return field ? user?.[field] : user;
  },
);
