import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { CreateRedirectResponse } from './dtos/create-redirect-response';
import { ReadRedirectResponse } from './dtos/read-redirect-response';
import { RedirectNotFound } from '../core/domain/redirect-not-found';
import { RedirectId } from '../core/domain/redirect-id';
import { CreateRedirectRequest } from './dtos/create-redirect-request';
import { UseAuth } from './auth/use-auth';
import { GetAuthenticatedUser } from './auth/get-authenticated-user';
import { AuthenticatedUser } from './auth/authenticated-user';
import { RedirectInteractor } from '../core/application/interactors/redirect-interactor';

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
            if (ex instanceof RedirectNotFound) {
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
}
