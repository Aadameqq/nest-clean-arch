import { AuthUser } from './AuthUser';
import { Token } from './Token';
import { TokenPayloadUser } from './TokenPayloadUser';

export interface TokenManager {
    createToken(authUser: AuthUser): Token;
    validateTokenAndFetchData(token: Token): TokenPayloadUser | false;
}
