import { TokenPayload } from '../../core/domain/token-payload';

export class AuthenticatedUser {
    private constructor(
        public readonly id: string,
        public readonly username: string,
    ) {}

    public static fromTokenPayloadUser(user: TokenPayload) {
        return new AuthenticatedUser(user.id, user.username);
    }
}
