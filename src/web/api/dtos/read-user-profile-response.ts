import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../core/domain/user';

export class ReadUserProfileResponse {
    @ApiProperty()
    public readonly displayName: string;

    @ApiProperty()
    public readonly bio: string;

    private constructor(displayName: string, bio: string) {
        this.displayName = displayName;
        this.bio = bio;
    }

    public static fromUser(user: User) {
        return new ReadUserProfileResponse(user.displayName, user.bio);
    }
}
