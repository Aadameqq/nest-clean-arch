import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateAuthRequest } from './dtos/create-auth-request';
import { InvalidPassword } from '../core/domain/invalid-password';
import { UserInteractor } from '../core/application/interactors/user-interactor';
import { NoSuchUser } from '../core/domain/no-such-user';
import { CreateAuthResponse } from './dtos/create-auth-response';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    public constructor(private userInteractor: UserInteractor) {}

    @ApiOperation({ summary: 'Creates access token for given user' })
    @ApiOkResponse({ description: 'Logged in successfully' })
    @ApiUnauthorizedResponse({ description: 'Credentials were incorrect' })
    @ApiBadRequestResponse({ description: 'Login or password was empty' })
    @Post()
    async post(@Body() createAuthRequest: CreateAuthRequest) {
        try {
            const token = await this.userInteractor.logIn(
                createAuthRequest.username, // TODO:
                createAuthRequest.password,
            );

            return CreateAuthResponse.fromToken(token);
        } catch (ex) {
            if (ex instanceof NoSuchUser || ex instanceof InvalidPassword) {
                throw new UnauthorizedException();
            }
            throw ex;
        }
    }
}
