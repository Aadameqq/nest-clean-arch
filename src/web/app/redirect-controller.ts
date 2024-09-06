import { Controller, Get, Param } from '@nestjs/common';
import { NoSuchRedirect } from '../../core/domain/no-such-redirect';
import { RedirectId } from '../../core/domain/redirect-id';
import { RedirectInteractor } from '../../core/application/interactors/redirect-interactor';
import { UseRedirectResponse } from './dtos/use-redirect-response';
import { Redirect, RedirectMethod } from './http-redirect-fasade';

@Controller('r')
export class RedirectController {
    public constructor(private redirectInteractor: RedirectInteractor) {}

    @Get('/:id')
    public async read(
        @Param('id') id: string,
        @RedirectMethod() redirect: Redirect,
    ) {
        try {
            const redirection = await this.redirectInteractor.view(
                RedirectId.fromString(id),
            );
            redirect(UseRedirectResponse.fromRedirect(redirection));
        } catch (ex) {
            if (ex instanceof NoSuchRedirect) {
                return 'Not Found';
            }
        }
    }
}
