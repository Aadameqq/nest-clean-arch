import {
    Body,
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
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { CreateRedirectResponse } from './dtos/create-redirect-response';
import { ReadRedirectResponse } from './dtos/read-redirect-response';
import { NoSuchRedirect } from '../core/domain/no-such-redirect';
import { RedirectId } from '../core/domain/redirect-id';
import { CreateRedirectRequest } from './dtos/create-redirect-request';
import { UseAuth } from './auth/use-auth';
import { GetAuthenticatedUser } from './auth/get-authenticated-user';
import { AuthenticatedUser } from './auth/authenticated-user';
import { RedirectInteractor } from '../core/application/interactors/redirect-interactor';
import { UserIsNotRedirectOwner } from '../core/domain/user-is-not-redirect-owner';

@Controller('redirects')
@ApiTags('Redirect')
export class RedirectController {
    public constructor(private redirectInteractor: RedirectInteractor) {}

    @ApiOperation({ summary: 'Views redirect' })
    @ApiParam({ name: 'id' })
    @ApiNotFoundResponse()
    @ApiOkResponse({ type: ReadRedirectResponse })
    @Get('/:id')
    public async read(@Param('id') id: string): Promise<ReadRedirectResponse> {
        try {
            const redirect = await this.redirectInteractor.view(
                RedirectId.fromString(id),
            );
            return ReadRedirectResponse.fromRedirect(redirect);
        } catch (ex) {
            if (ex instanceof NoSuchRedirect) {
                throw new NotFoundException();
            }
            throw ex;
        }
    }

    @ApiBearerAuth()
    @ApiCreatedResponse({ type: CreateRedirectResponse })
    @UseAuth()
    @Post()
    public async create(
        @Body() { url }: CreateRedirectRequest,
        @GetAuthenticatedUser() user: AuthenticatedUser,
    ): Promise<CreateRedirectResponse> {
        const redirect = await this.redirectInteractor.create(url, user.id);
        return CreateRedirectResponse.fromRedirect(redirect);
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
            await this.redirectInteractor.remove(
                RedirectId.fromString(id),
                user.id,
            );
        } catch (ex) {
            if (ex instanceof NoSuchRedirect) {
                throw new NotFoundException();
            }
            if (ex instanceof UserIsNotRedirectOwner) {
                throw new ForbiddenException();
            }
            throw ex;
        }
    }
}
