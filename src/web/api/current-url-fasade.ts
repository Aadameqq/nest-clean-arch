import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { createUrl } from '../create-url';
import { webConfig } from '../../web-config';

export const CurrentUrl = createParamDecorator(
    (_: unknown, ctx: ExecutionContext) => {
        const { url: currentPath } = ctx.switchToHttp().getRequest();
        return createUrl(webConfig.DOMAIN, currentPath);
    },
);
