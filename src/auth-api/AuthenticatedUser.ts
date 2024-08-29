import { TokenPayloadUser } from '../auth/TokenPayloadUser';

export class AuthenticatedUser {
    private constructor(
        public readonly id: string,
        public readonly username: string,
    ) {}

    public static fromTokenPayloadUser(user: TokenPayloadUser) {
        return new AuthenticatedUser(user.id, user.username);
    }
}
