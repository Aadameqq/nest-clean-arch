import { UserId } from '../../domain/user-id';
import { User } from '../../domain/user';

export interface UserRepository {
    getById(id: UserId): Promise<User | false>;
    getByUsername(username: string): Promise<User | false>;
    persist(user: User): Promise<void>;
    generateIdentity(): UserId;
}
