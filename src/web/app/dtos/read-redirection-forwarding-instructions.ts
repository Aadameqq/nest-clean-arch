import { HttpRedirectResponse, HttpStatus } from '@nestjs/common';
import { Redirection } from '../../../core/domain/redirection';

export class ReadRedirectionForwardingInstructions
    implements HttpRedirectResponse
{
    public readonly statusCode = HttpStatus.FOUND;

    private constructor(public readonly url: string) {}

    public static fromRedirection(redirection: Redirection) {
        return new ReadRedirectionForwardingInstructions(redirection.url);
    }
}
