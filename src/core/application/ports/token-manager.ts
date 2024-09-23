import { Token } from '../../domain/token';
import { TokenPayload } from '../../domain/token-payload';
import { User } from '../../domain/user';

export interface TokenManager {
    createToken(user: User): Token;
    validateTokenAndFetchData(token: Token): TokenPayload | false;
}
