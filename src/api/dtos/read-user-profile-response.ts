import { ApiProperty } from '@nestjs/swagger';
import { UserProfile } from '../../user-profile/UserProfile';

export class ReadUserProfileResponse {
    @ApiProperty()
    public readonly displayName: string;

    @ApiProperty()
    public readonly bio: string;

    private constructor(displayName: string, bio: string) {
        this.displayName = displayName;
        this.bio = bio;
    }

    public static fromUserProfile(userProfile: UserProfile) {
        return new ReadUserProfileResponse(
            userProfile.displayName,
            userProfile.bio,
        );
    }
}
