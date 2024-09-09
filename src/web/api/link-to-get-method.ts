import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { webConfig } from '../../web-config';

export type LinkToGetMethod = (id: string) => void;

export const LinkToGetMethodFn = createParamDecorator(
    (_: unknown, ctx: ExecutionContext): LinkToGetMethod => {
        const req = ctx.switchToHttp().getRequest();
        const res = ctx.switchToHttp().getResponse();
        return (id: string) => {
            res.setHeader('Location', `${webConfig.DOMAIN}${req.url}/${id}`);
        };
    },
);
