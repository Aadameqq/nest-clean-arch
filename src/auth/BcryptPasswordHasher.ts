import * as bcrypt from 'bcrypt';
import { PasswordHasher } from './PasswordHasher';
import { ConfigurationService } from '../configuration/configuration.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptPasswordHasher implements PasswordHasher {
    public constructor(private configurationService: ConfigurationService) {}

    async hash(password: string): Promise<string> {
        return bcrypt.hash(
            password,
            this.configurationService.get('PASSWORD_SALT_ROUNDS'),
        );
    }

    async compare(
        hashedPassword: string,
        plainPassword: string,
    ): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
}
