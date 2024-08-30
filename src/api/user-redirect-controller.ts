import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ReadManyRedirectsResponse } from './dtos/read-many-redirects-response';
import { UseAuth } from './auth/use-auth';
import { GetAuthenticatedUser } from './auth/get-authenticated-user';
import { AuthenticatedUser } from './auth/authenticated-user';
import { RedirectInteractor } from '../core/application/interactors/redirect-interactor';

@Controller('/users/@me/redirects')
@ApiTags('Redirect')
export class UserRedirectController {
    public constructor(private redirectInteractor: RedirectInteractor) {}

    @ApiBearerAuth()
    @ApiOkResponse({ type: ReadManyRedirectsResponse })
    @UseAuth()
    @Get()
    public async readMany(
        @GetAuthenticatedUser() user: AuthenticatedUser,
    ): Promise<ReadManyRedirectsResponse> {
        const foundRedirects = await this.redirectInteractor.listForOwner(
            user.id,
        );

        return ReadManyRedirectsResponse.fromRedirectsList(foundRedirects);
    }
}
