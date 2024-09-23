import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type SetHeader = (name: string, value: string) => void;

export const SetHeaderFn = createParamDecorator(
    (_: unknown, ctx: ExecutionContext): SetHeader => {
        const res = ctx.switchToHttp().getResponse();
        return (name: string, value: string) => {
            res.setHeader(name, value);
        };
    },
);
