import { UserId } from '../../domain/user-id';
import { NoSuchUser } from '../../domain/no-such-user';
import { UserRepository } from '../ports/user-repository';
import { Token } from '../../domain/token';
import { InvalidPassword } from '../../domain/invalid-password';
import { UsernameOccupied } from '../../domain/username-occupied';
import { InvalidToken } from '../../domain/invalid-token';
import { User } from '../../domain/user';
import { TokenManager } from '../ports/token-manager';
import { PasswordHasher } from '../ports/password-hasher';
import { TokenPayload } from '../../domain/token-payload';
import { UserInteractor } from './user-interactor';

export class UserInteractorImpl extends UserInteractor {
    public constructor(
        private userRepository: UserRepository,
        private tokenManager: TokenManager,
        private passwordHasher: PasswordHasher,
    ) {
        super();
    }

    public async findById(id: UserId): Promise<User> {
        const found = await this.userRepository.getById(id);

        if (!found) {
            throw new NoSuchUser();
        }

        return found;
    }

    public async logIn(username: string, password: string): Promise<Token> {
        const user = await this.userRepository.getByUsername(username);

        if (!user) throw new NoSuchUser();

        const isPasswordValid = await this.passwordHasher.compare(
            user.password,
            password,
        );

        if (!isPasswordValid) throw new InvalidPassword();

        return this.tokenManager.createToken(user);
    }

    public async register(
        username: string,
        plainPassword: string,
    ): Promise<void> {
        const found = await this.userRepository.getByUsername(username);

        if (found) throw new UsernameOccupied();

        const hashedPassword = await this.passwordHasher.hash(plainPassword);

        const id = this.userRepository.generateIdentity();

        const user = new User(id, username, hashedPassword);

        await this.userRepository.persist(user);
    }

    public async retrieveTokenPayload(token: Token): Promise<TokenPayload> {
        if (!token) throw new InvalidToken();

        const tokenPayload = this.tokenManager.validateTokenAndFetchData(token);

        if (!tokenPayload) throw new InvalidToken();

        return tokenPayload;
    }
}
