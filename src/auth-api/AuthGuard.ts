import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Token } from '../auth/Token';
import { AuthService } from '../auth/AuthService';
import { AuthenticatedUser } from './AuthenticatedUser';
import { InvalidTokenException } from '../auth/InvalidTokenException';

@Injectable()
export class AuthGuard implements CanActivate {
    public constructor(private authService: AuthService) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();

        const token = AuthGuard.extractTokenFromHeader(
            req.headers.authorization,
        );

        if (!token) throw new UnauthorizedException();

        try {
            const tokenPayloadUser = await this.authService.fetchAuthUser(
                Token.fromString(token),
            );

            req.authenticatedUser =
                AuthenticatedUser.fromTokenPayloadUser(tokenPayloadUser);

            return true;
        } catch (ex) {
            if (ex instanceof InvalidTokenException) {
                throw new UnauthorizedException();
            }
            throw ex;
        }
    }

    public static extractTokenFromHeader(authHeader: unknown): string | false {
        if (!authHeader || typeof authHeader !== 'string') return false;

        const [type, token] = authHeader.split(' ');

        if (type !== 'Bearer') return false;

        if (!token) return false;

        return token;
    }
}
