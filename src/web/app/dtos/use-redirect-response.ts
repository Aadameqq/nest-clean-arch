import { HttpRedirectResponse, HttpStatus } from '@nestjs/common';
import { Redirection } from '../../../core/domain/redirection';

export class UseRedirectResponse implements HttpRedirectResponse {
    public readonly statusCode = HttpStatus.TEMPORARY_REDIRECT;

    private constructor(public readonly url: string) {}

    public static fromRedirect(redirect: Redirection) {
        return new UseRedirectResponse(redirect.url);
    }
}
