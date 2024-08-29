import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedUser } from './AuthenticatedUser';

export const GetAuthenticatedUser = createParamDecorator(
    (_: unknown, ctx: ExecutionContext) => {
        const { authenticatedUser } = ctx.switchToHttp().getRequest();

        if (!authenticatedUser)
            throw new Error('req.authenticatedUser is undefined');

        return authenticatedUser as AuthenticatedUser;
    },
);
