import {
    Body,
    ConflictException,
    Controller,
    Post,
    UnauthorizedException,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginUserDto } from './dtos/login-user.dto';
import { AuthService } from '../auth/AuthService';
import { RegisterUserDto } from './dtos/register-user.dto';
import { AuthUserFactory } from '../auth/AuthUserFactory';
import { AuthUserDoesNotExistException } from '../auth/AuthUserDoesNotExistException';
import { InvalidPasswordException } from '../auth/InvalidPasswordException';
import { UsernameOccupiedException } from '../auth/UsernameOccupiedException';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private authUserFactory: AuthUserFactory,
    ) {}

    @ApiOperation({ summary: 'Creates access token for given user' })
    @ApiOkResponse({ description: 'Logged in successfully' })
    @ApiUnauthorizedResponse({ description: 'Credentials were incorrect' })
    @ApiBadRequestResponse({ description: 'Login or password was empty' })
    @Post()
    async login(@Body() loginUserDto: LoginUserDto) {
        try {
            const token = await this.authService.logIn(
                loginUserDto.username,
                loginUserDto.password,
            );

            return { token };
        } catch (ex) {
            if (
                ex instanceof AuthUserDoesNotExistException ||
                ex instanceof InvalidPasswordException
            ) {
                throw new UnauthorizedException();
            }
            throw ex;
        }
    }

    @ApiOperation({ summary: 'Creates new user' })
    @ApiCreatedResponse({ description: 'Created new Account' })
    @ApiBadRequestResponse({ description: "Given data didn't pass validation" })
    @Post('/temporary')
    async register(@Body() registerUserDto: RegisterUserDto) {
        const authUser = this.authUserFactory.create(
            registerUserDto.username,
            registerUserDto.password,
        );

        try {
            await this.authService.register(authUser);
        } catch (ex) {
            if (ex instanceof UsernameOccupiedException) {
                throw new ConflictException();
            }
            throw ex;
        }
    }
}
