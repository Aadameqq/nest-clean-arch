import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ReadManyRedirectionsResponse } from './dtos/read-many-redirections-response';
import { UseAuth } from './auth/use-auth';
import { GetAuthenticatedUser } from './auth/get-authenticated-user';
import { AuthenticatedUser } from './auth/authenticated-user';
import { RedirectionInteractor } from '../../core/application/interactors/redirection-interactor';
import { ShortenedUrlGenerator } from './shortened-url-generator';

@Controller('/users/@me/redirections')
@ApiTags('User redirection')
export class UserRedirectionController {
    public constructor(
        private redirectionInteractor: RedirectionInteractor,
        private shortenedUrlGenerator: ShortenedUrlGenerator,
    ) {}

    @ApiBearerAuth()
    @ApiOkResponse({ type: ReadManyRedirectionsResponse })
    @UseAuth()
    @Get()
    public async readMany(
        @GetAuthenticatedUser() user: AuthenticatedUser,
    ): Promise<ReadManyRedirectionsResponse> {
        const foundRedirections = await this.redirectionInteractor.listForOwner(
            user.id,
        );

        return ReadManyRedirectionsResponse.fromRedirectionList(
            foundRedirections,
            this.shortenedUrlGenerator,
        );
    }
}
