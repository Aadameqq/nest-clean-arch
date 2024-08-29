import { UserProfileRepository } from './UserProfileRepository';
import { UserProfileId } from './UserProfileId';
import { UserProfileNotFoundException } from './UserProfileNotFoundException';
import { UserProfile } from './UserProfile';

export class UserProfileService {
    public constructor(private userProfileRepository: UserProfileRepository) {}

    public async findById(id: UserProfileId): Promise<UserProfile> {
        const found = await this.userProfileRepository.findById(id);

        if (!found) {
            throw new UserProfileNotFoundException();
        }

        return found;
    }
}
