import { AuthUserRepository } from './AuthUserRepository';
import { AuthUser } from './AuthUser';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthUserFactory {
    public constructor(private authUserRepository: AuthUserRepository) {}

    public create(username: string, password: string) {
        const id = this.authUserRepository.generateIdentity();

        return new AuthUser(id, username, password);
    }
}
