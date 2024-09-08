import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { TokenManager } from '../application/ports/token-manager';
import { Token } from '../domain/token';
import { TokenPayload } from '../domain/token-payload';
import { User } from '../domain/user';
import { coreConfig } from './core-config';

type AuthDataJwtPayload = {
    id: string;
    username: string;
} & jwt.JwtPayload;

@Injectable()
export class JsonwebtokenTokenManager implements TokenManager {
    private readonly secret: string;

    private readonly expirationTime: number;

    public constructor() {
        this.secret = coreConfig.JWT_SECRET;
        this.expirationTime = coreConfig.JWT_EXPIRATION_TIME_IN_SECONDS;
    }

    public createToken = (user: User): Token => {
        const payload = {
            id: user.id.toString(),
            username: user.username,
        };

        const stringToken = jwt.sign(payload, this.secret, {
            expiresIn: this.expirationTime,
        });

        return Token.fromString(stringToken);
    };

    public validateTokenAndFetchData = (token: Token): TokenPayload | false => {
        try {
            const payload = jwt.verify(
                token.toString(),
                this.secret,
            ) as AuthDataJwtPayload;

            return new TokenPayload(payload.id, payload.username);
        } catch (ex) {
            return false;
        }
    };
}
