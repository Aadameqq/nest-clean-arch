import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    NotFoundException,
    Param,
    Post,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { CreateRedirectionResponse } from './dtos/create-redirection-response';
import { NoSuchRedirection } from '../../core/domain/no-such-redirection';
import { RedirectionId } from '../../core/domain/redirection-id';
import { CreateRedirectionRequest } from './dtos/create-redirection-request';
import { UseAuth } from './auth/use-auth';
import { GetAuthenticatedUser } from './auth/get-authenticated-user';
import { AuthenticatedUser } from './auth/authenticated-user';
import { RedirectionInteractor } from '../../core/application/interactors/redirection-interactor';
import { UserIsNotRedirectionOwner } from '../../core/domain/user-is-not-redirection-owner';
import { ShortenedUrlGenerator } from './shortened-url-generator';

@Controller('redirections')
@ApiTags('Redirection')
export class RedirectionController {
    public constructor(
        private redirectionInteractor: RedirectionInteractor,
        private shortenedUrlGenerator: ShortenedUrlGenerator,
    ) {}

    @ApiBearerAuth()
    @ApiCreatedResponse({ type: CreateRedirectionResponse })
    @UseAuth()
    @Post()
    public async create(
        @Body() { url }: CreateRedirectionRequest,
        @GetAuthenticatedUser() user: AuthenticatedUser,
    ): Promise<CreateRedirectionResponse> {
        const redirection = await this.redirectionInteractor.create(
            url,
            user.id,
        );

        return CreateRedirectionResponse.fromShortenedUrl(
            this.shortenedUrlGenerator.generateFromRedirection(redirection),
        );
    }

    @ApiBearerAuth()
    @ApiOkResponse()
    @ApiNotFoundResponse()
    @ApiForbiddenResponse()
    @UseAuth()
    @Delete('/:id')
    public async remove(
        @Param('id') id: string,
        @GetAuthenticatedUser() user: AuthenticatedUser,
    ): Promise<void> {
        try {
            await this.redirectionInteractor.remove(
                RedirectionId.fromString(id),
                user.id,
            );
        } catch (ex) {
            if (ex instanceof NoSuchRedirection) {
                throw new NotFoundException();
            }
            if (ex instanceof UserIsNotRedirectionOwner) {
                throw new ForbiddenException();
            }
            throw ex;
        }
    }
}
