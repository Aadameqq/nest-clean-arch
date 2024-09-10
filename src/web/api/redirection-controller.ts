import {
    Body,
    ConflictException,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    NotFoundException,
    Param,
    Post,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiConflictResponse,
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
import { RedirectionAlreadyExistsForOwner } from '../../core/domain/RedirectionAlreadyExistsForOwner';
import { ReadRedirectionResponse } from './dtos/read-redirection-response';
import { SetHeader, SetHeaderFn } from './set-header-fasade';
import { CurrentUrl } from './current-url-fasade';
import { createUrl } from '../create-url';

@Controller('redirections')
@ApiTags('Redirection')
export class RedirectionController {
    public constructor(private redirectionInteractor: RedirectionInteractor) {}

    @ApiBearerAuth()
    @ApiCreatedResponse({
        type: CreateRedirectionResponse,
    })
    @ApiConflictResponse({
        description: 'User has already created redirection for given url',
        headers: {
            Location: {
                description: 'Location of already existing redirection',
            },
        },
    })
    @UseAuth()
    @Post()
    public async create(
        @Body() { url }: CreateRedirectionRequest,
        @GetAuthenticatedUser() user: AuthenticatedUser,
        @SetHeaderFn() setHeader: SetHeader,
        @CurrentUrl() currentUrl: string,
    ): Promise<CreateRedirectionResponse> {
        try {
            const redirection = await this.redirectionInteractor.create(
                url,
                user.id,
            );
            return CreateRedirectionResponse.fromRedirection(redirection);
        } catch (ex) {
            if (ex instanceof RedirectionAlreadyExistsForOwner) {
                setHeader(
                    'Location',
                    createUrl(currentUrl, ex.existingRedirection.id.toString()),
                );
                throw new ConflictException(
                    `User has already created redirection for given url`,
                );
            }
        }
    }

    @ApiBearerAuth()
    @ApiOkResponse({ type: ReadRedirectionResponse })
    @ApiNotFoundResponse()
    @ApiForbiddenResponse()
    @UseAuth()
    @Get('/:id')
    public async read(
        @Param('id') id: string,
        @GetAuthenticatedUser() user: AuthenticatedUser,
    ): Promise<ReadRedirectionResponse> {
        try {
            const redirection = await this.redirectionInteractor.viewOne(
                RedirectionId.fromString(id),
                user.id,
            );
            return ReadRedirectionResponse.fromRedirection(redirection);
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
