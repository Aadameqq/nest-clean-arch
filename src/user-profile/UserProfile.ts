import { UserProfileId } from './UserProfileId';

export class UserProfile {
    public constructor(
        public readonly id: UserProfileId,
        public readonly displayName: string,
        public readonly bio: string = '',
    ) {}
}
