import { UserProfileId } from './UserProfileId';
import { UserProfile } from './UserProfile';

export interface UserProfileRepository {
    findById(userProfileId: UserProfileId): Promise<UserProfile | false>;
}
