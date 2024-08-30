import { UserId } from '../../domain/user-id';
import { User } from '../../domain/user';
import { Token } from '../../domain/token';
import { TokenPayload } from '../../domain/token-payload';

export abstract class UserInteractor {
    abstract findById(id: UserId): Promise<User>;
    abstract logIn(username: string, password: string): Promise<Token>;
    abstract register(username: string, plainPassword: string): Promise<void>;
    abstract retrieveTokenPayload(token: Token): Promise<TokenPayload>;
}
