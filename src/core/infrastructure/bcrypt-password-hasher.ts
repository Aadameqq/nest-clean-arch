import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { PasswordHasher } from '../application/ports/password-hasher';
import { coreConfig } from './core-config';

@Injectable()
export class BcryptPasswordHasher implements PasswordHasher {
    public async hash(password: string): Promise<string> {
        return bcrypt.hash(password, coreConfig.PASSWORD_SALT_ROUNDS);
    }

    public async compare(
        hashedPassword: string,
        plainPassword: string,
    ): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
}
