import { AuthUser } from './AuthUser';

export interface AuthUserRepository {
    findByUsername(username: string): Promise<AuthUser | false>;
    persist(user: AuthUser): Promise<void>;
    generateIdentity(): string;
}
