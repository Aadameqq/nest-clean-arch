import { UserId } from '../../domain/user-id';
import { User } from '../../domain/user';
import { Token } from '../../domain/token';
import { TokenPayload } from '../../domain/token-payload';

export abstract class UserInteractor {
    public abstract findById(id: UserId): Promise<User>;
    public abstract logIn(username: string, password: string): Promise<Token>;
    public abstract register(
        username: string,
        plainPassword: string,
    ): Promise<void>;
    public abstract retrieveTokenPayload(token: Token): Promise<TokenPayload>;
}
