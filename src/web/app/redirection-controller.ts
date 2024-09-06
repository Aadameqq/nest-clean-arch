import { Controller, Get, Param } from '@nestjs/common';
import { NoSuchRedirection } from '../../core/domain/no-such-redirection';
import { RedirectionId } from '../../core/domain/redirection-id';
import { RedirectionInteractor } from '../../core/application/interactors/redirection-interactor';
import { UseRedirectResponse } from './dtos/use-redirect-response';
import { Redirect, RedirectMethod } from './http-redirect-fasade';

@Controller('r')
export class RedirectionController {
    public constructor(private redirectInteractor: RedirectionInteractor) {}

    @Get('/:id')
    public async read(
        @Param('id') id: string,
        @RedirectMethod() redirect: Redirect,
    ) {
        try {
            const redirection = await this.redirectInteractor.use(
                RedirectionId.fromString(id),
            );
            redirect(UseRedirectResponse.fromRedirect(redirection));
        } catch (ex) {
            if (ex instanceof NoSuchRedirection) {
                return 'Not Found';
            }
        }
    }
}
