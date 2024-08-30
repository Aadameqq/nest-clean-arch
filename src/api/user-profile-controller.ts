import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { UserProfileService } from '../user-profile/UserProfileService';
import { UserProfileId } from '../user-profile/UserProfileId';
import { ReadUserProfileResponse } from './dtos/read-user-profile-response';
import { UseAuth } from './auth/use-auth';
import { GetAuthenticatedUser } from './auth/get-authenticated-user';
import { AuthenticatedUser } from './auth/authenticated-user';

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
