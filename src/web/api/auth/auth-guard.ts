import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { InvalidToken } from '../../../core/domain/invalid-token';
import { UserInteractor } from '../../../core/application/interactors/user-interactor';
import { Token } from '../../../core/domain/token';
import { AuthenticatedUser } from './authenticated-user';

@Injectable()
export class AuthGuard implements CanActivate {
    public constructor(private userInteractor: UserInteractor) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();

        const token = AuthGuard.extractTokenFromHeader(
            req.headers.authorization,
        );

        if (!token) throw new UnauthorizedException();

        try {
            const tokenPayload = await this.userInteractor.retrieveTokenPayload(
                Token.fromString(token),
            );

            req.authenticatedUser =
                AuthenticatedUser.fromTokenPayloadUser(tokenPayload);

            return true;
        } catch (ex) {
            if (ex instanceof InvalidToken) {
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
