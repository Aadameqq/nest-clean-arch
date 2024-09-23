import { Controller, Get, Param } from '@nestjs/common';
import { NoSuchRedirection } from '../../core/domain/no-such-redirection';
import { RedirectionInteractor } from '../../core/application/interactors/redirection-interactor';
import { ReadRedirectionForwardingInstructions } from './dtos/read-redirection-forwarding-instructions';
import { Redirect, RedirectFn } from './redirect-fasade';
import { webConfig } from '../../web-config';

@Controller(webConfig.SHORTENED_LINK_ROUTE)
export class RedirectionController {
    public constructor(private redirectInteractor: RedirectionInteractor) {}

    @Get('/:slug')
    public async read(
        @Param('slug') slug: string,
        @RedirectFn() redirect: Redirect,
    ) {
        try {
            const redirection = await this.redirectInteractor.use(slug);

            redirect(
                ReadRedirectionForwardingInstructions.fromRedirection(
                    redirection,
                ),
            );
        } catch (ex) {
            if (ex instanceof NoSuchRedirection) {
                return 'Not Found';
            }
        }
    }
}
