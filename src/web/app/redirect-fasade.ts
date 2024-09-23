import {
    createParamDecorator,
    ExecutionContext,
    HttpRedirectResponse,
} from '@nestjs/common';

export type Redirect = (httpRedirection: HttpRedirectResponse) => void;

export const RedirectFn = createParamDecorator(
    (_: unknown, ctx: ExecutionContext): Redirect => {
        const res = ctx.switchToHttp().getResponse();
        return (httpRedirection: HttpRedirectResponse) => {
            res.redirect(httpRedirection.statusCode, httpRedirection.url);
        };
    },
);
