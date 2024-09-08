import { HttpRedirectResponse, HttpStatus } from '@nestjs/common';
import { Redirection } from '../../../core/domain/redirection';

export class CreateRedirectionForwardingInstructions
    implements HttpRedirectResponse
{
    public readonly statusCode = HttpStatus.SEE_OTHER;

    private constructor(public readonly url: string) {}

    public fromRedirection(redirection: Redirection) {}
}
