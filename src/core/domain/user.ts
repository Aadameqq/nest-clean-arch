import { UserId } from './user-id';

export class User {
    public constructor(
        public readonly id: UserId,
        public readonly username: string,
        public password: string,
        public readonly displayName: string,
        public readonly bio: string = '',
    ) {}

    public setPassword(newPassword: string) {
        this.password = newPassword;
    }
}
