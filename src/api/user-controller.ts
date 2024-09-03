import {
    Body,
    ConflictException,
    Controller,
    ForbiddenException,
    Post,
    Put,
    UnauthorizedException,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { CreateUserRequest } from './dtos/create-user-request';
import { UsernameOccupied } from '../core/domain/username-occupied';
import { UserInteractor } from '../core/application/interactors/user-interactor';
import { GetAuthenticatedUser } from './auth/get-authenticated-user';
import { UseAuth } from './auth/use-auth';
import { AuthenticatedUser } from './auth/authenticated-user';
import { UserId } from '../core/domain/user-id';
import { UpdateUserPasswordRequest } from './dtos/update-user-password-request';
import { NoSuchUser } from '../core/domain/no-such-user';
import { WrongPassword } from '../core/domain/wrong-password';
import { NewPasswordSameAsOld } from '../core/domain/new-password-same-as-old';

@Controller('users')
@ApiTags('User')
export class UserController {
    public constructor(private userInteractor: UserInteractor) {}

    @ApiCreatedResponse()
    @ApiBadRequestResponse()
    @ApiConflictResponse()
    @Post('/')
    public async register(@Body() { username, password }: CreateUserRequest) {
        try {
            await this.userInteractor.register(username, password);
        } catch (ex) {
            if (ex instanceof UsernameOccupied) {
                throw new ConflictException();
            }
            throw ex;
        }
    }

    @ApiOkResponse()
    @ApiForbiddenResponse({
        description: 'Wrong password',
    })
    @ApiConflictResponse({
        description: 'New password cannot be the same as the old one',
    })
    @ApiBearerAuth()
    @UseAuth()
    @Put('/@me/password')
    public async updatePassword(
        @Body() { oldPassword, newPassword }: UpdateUserPasswordRequest,
        @GetAuthenticatedUser() user: AuthenticatedUser,
    ) {
        try {
            await this.userInteractor.changePassword(
                UserId.fromString(user.id),
                newPassword,
                oldPassword,
            );
        } catch (ex) {
            if (ex instanceof NoSuchUser) {
                throw new UnauthorizedException();
            }
            if (ex instanceof WrongPassword) {
                throw new ForbiddenException('Wrong password');
            }
            if (ex instanceof NewPasswordSameAsOld) {
                throw new ConflictException(
                    'New password cannot be the same as the old one',
                );
            }
            throw ex;
        }
    }
}
