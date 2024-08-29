import {
    Body,
    Controller,
    Get,
    HttpStatus,
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
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { RedirectService } from '../redirect/RedirectService';
import { CreateRedirectResponse } from './dto/CreateRedirectResponse';
import { UseAuth } from '../auth-api/UseAuth';
import { GetAuthenticatedUser } from '../auth-api/GetAuthenticatedUser';
import { AuthenticatedUser } from '../auth-api/AuthenticatedUser';
import { ReadRedirectResponse } from './dto/ReadRedirectResponse';
import { ReadManyRedirectsResponse } from './dto/ReadManyRedirectsResponse';
import { RedirectNotFoundException } from '../redirect/RedirectNotFoundException';
import { RedirectIdGenerator } from '../redirect/RedirectIdGenerator';
import { RedirectId } from '../redirect/RedirectId';
import { CreateRedirectRequest } from './dto/CreateRedirectRequest';

@Controller('redirects')
@ApiTags('Redirect')
export class RedirectController {
    public constructor(
        private redirectService: RedirectService,
        private redirectIdGenerator: RedirectIdGenerator,
    ) {}

    @ApiOperation({ summary: 'Redirects to url with given id' })
    @ApiParam({ name: 'id' })
    @ApiNotFoundResponse()
    @ApiOkResponse({ type: ReadRedirectResponse })
    @Get('/:id')
    public async read(@Param('id') id: string): Promise<ReadRedirectResponse> {
        try {
            const redirect = await this.redirectService.getById(
                RedirectId.fromString(id),
            );
            return ReadRedirectResponse.fromRedirect(redirect);
        } catch (ex) {
            if (ex instanceof RedirectNotFoundException) {
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
        @Body() createRedirectRequest: CreateRedirectRequest,
        @GetAuthenticatedUser() user: AuthenticatedUser,
    ): Promise<CreateRedirectResponse> {
        const redirectId = this.redirectIdGenerator.generateNew();
        const redirect = createRedirectRequest.toRedirect(redirectId, user.id);

        await this.redirectService.create(redirect);
        return CreateRedirectResponse.fromRedirect(redirect);
    }

    @ApiBearerAuth()
    @ApiOkResponse({ type: ReadManyRedirectsResponse })
    @UseAuth()
    @Get()
    public async readMany(
        @GetAuthenticatedUser() user: AuthenticatedUser,
    ): Promise<ReadManyRedirectsResponse> {
        const foundRedirects = await this.redirectService.getAllByOwnerId(
            user.id,
        );

        return ReadManyRedirectsResponse.fromRedirectsList(foundRedirects);
    }
}
