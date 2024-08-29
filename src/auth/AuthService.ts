import { Injectable } from '@nestjs/common';
import { PasswordHasher } from './PasswordHasher';
import { AuthUserRepository } from './AuthUserRepository';
import { TokenManager } from './TokenManager';
import { AuthUserDoesNotExistException } from './AuthUserDoesNotExistException';
import { InvalidPasswordException } from './InvalidPasswordException';
import { AuthUser } from './AuthUser';
import { InvalidTokenException } from './InvalidTokenException';
import { UsernameOccupiedException } from './UsernameOccupiedException';
import { Token } from './Token';

@Injectable()
export class AuthService {
    public constructor(
        private passwordHasher: PasswordHasher,
        private authUserRepository: AuthUserRepository,
        private tokenManager: TokenManager,
    ) {}

    public async logIn(username: string, password: string): Promise<Token> {
        const authUser = await this.authUserRepository.findByUsername(username);

        if (!authUser) throw new AuthUserDoesNotExistException();

        const isPasswordValid = await this.passwordHasher.compare(
            authUser.password,
            password,
        );

        if (!isPasswordValid) throw new InvalidPasswordException();

        return this.tokenManager.createToken(authUser);
    }

    public async register(authUser: AuthUser): Promise<void> {
        const found = await this.authUserRepository.findByUsername(
            authUser.username,
        );

        if (found) {
            throw new UsernameOccupiedException();
        }

        const hashedPassword = await this.passwordHasher.hash(
            authUser.password,
        );

        authUser.setPassword(hashedPassword); // TODO:

        await this.authUserRepository.persist(authUser);
    }

    public async fetchAuthUser(token: Token) {
        if (!token) throw new InvalidTokenException();

        const tokenPayloadUser =
            this.tokenManager.validateTokenAndFetchData(token);

        if (!tokenPayloadUser) throw new InvalidTokenException();

        return tokenPayloadUser;
    }
}
