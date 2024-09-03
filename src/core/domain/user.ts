import { UserId } from './user-id';

export class User {
    public constructor(
        public readonly id: UserId,
        public readonly username: string,
        public password: string,
        public readonly displayName: string = username,
        public readonly bio: string = '',
    ) {}

    public changePassword(newPassword: string) {
        this.password = newPassword;
    }
}
