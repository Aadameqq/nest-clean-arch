import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { UserId } from '../../core/domain/user-id';
import { ReadUserProfileResponse } from './dtos/read-user-profile-response';
import { UseAuth } from '../auth/use-auth';
import { GetAuthenticatedUser } from '../auth/get-authenticated-user';
import { AuthenticatedUser } from '../auth/authenticated-user';
import { UserInteractor } from '../../core/application/interactors/user-interactor';

@Controller('/users/@me/profile')
@ApiTags('User profile')
export class UserProfileController {
    public constructor(private userInteractor: UserInteractor) {}

    @ApiOperation({ summary: "Fetches currently logged in user's profile" })
    @ApiOkResponse({ type: ReadUserProfileResponse })
    @ApiBearerAuth()
    @UseAuth()
    @Get()
    public async read(@GetAuthenticatedUser() user: AuthenticatedUser) {
        const userProfile = await this.userInteractor.findById(
            UserId.fromString(user.id),
        );

        return ReadUserProfileResponse.fromUser(userProfile);
    }
}
