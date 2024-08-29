import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { ConfigurationService } from '../configuration/configuration.service';
import { TokenManager } from './TokenManager';
import { AuthUser } from './AuthUser';
import { Token } from './Token';
import { TokenPayloadUser } from './TokenPayloadUser';

type AuthDataJwtPayload = {
    id: string;
    username: string;
} & jwt.JwtPayload;

@Injectable()
export class JsonwebtokenTokenManager implements TokenManager {
    private readonly secret: string;

    private readonly expirationTime: number;

    public constructor(configurationService: ConfigurationService) {
        this.secret = configurationService.get('JWT_SECRET');
        this.expirationTime = configurationService.get(
            'JWT_EXPIRATION_TIME_IN_SECONDS',
        );
    }

    public createToken = (authUser: AuthUser): Token => {
        const payload = {
            id: authUser.id,
            username: authUser.username,
        };

        const stringToken = jwt.sign(payload, this.secret, {
            expiresIn: this.expirationTime,
        });

        return Token.fromString(stringToken);
    };

    public validateTokenAndFetchData = (
        token: Token,
    ): TokenPayloadUser | false => {
        try {
            const payload = jwt.verify(
                token.toString(),
                this.secret,
            ) as AuthDataJwtPayload;

            return new TokenPayloadUser(payload.id, payload.username);
        } catch (ex) {
            return false;
        }
    };
}
