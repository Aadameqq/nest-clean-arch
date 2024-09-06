import { HttpRedirectResponse, HttpStatus } from '@nestjs/common';
import { Redirect } from '../../../core/domain/redirect';

export class UseRedirectResponse implements HttpRedirectResponse {
    public readonly statusCode = HttpStatus.TEMPORARY_REDIRECT;

    private constructor(public readonly url: string) {}

    public static fromRedirect(redirect: Redirect) {
        return new UseRedirectResponse(redirect.url);
    }
}
