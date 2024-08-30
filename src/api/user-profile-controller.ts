import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { UserProfileService } from '../user-profile/UserProfileService';
import { AuthenticatedUser } from '../auth-api/AuthenticatedUser';
import { GetAuthenticatedUser } from '../auth-api/GetAuthenticatedUser';
import { UseAuth } from '../auth-api/UseAuth';
import { UserProfileId } from '../user-profile/UserProfileId';
import { ReadUserProfileResponse } from './dtos/read-user-profile-response';

@Controller('/user/profile')
@ApiTags('User profile')
export class UserProfileController {
    public constructor(private userProfileService: UserProfileService) {}

    @ApiOperation({ summary: "Fetches currently logged in user's profile" })
    @ApiOkResponse({ type: ReadUserProfileResponse })
    @ApiBearerAuth()
    @UseAuth()
    @Get()
    public async read(@GetAuthenticatedUser() user: AuthenticatedUser) {
        const userProfile = await this.userProfileService.findById(
            UserProfileId.fromString(user.id),
        );

        return ReadUserProfileResponse.fromUserProfile(userProfile);
    }
}
