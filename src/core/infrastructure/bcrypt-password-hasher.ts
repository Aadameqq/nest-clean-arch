import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { PasswordHasher } from '../application/ports/password-hasher';
import { ConfigurationService } from '../../configuration/configuration.service';

@Injectable()
export class BcryptPasswordHasher implements PasswordHasher {
    public constructor(private configurationService: ConfigurationService) {}

    public async hash(password: string): Promise<string> {
        return bcrypt.hash(
            password,
            this.configurationService.get('PASSWORD_SALT_ROUNDS'),
        );
    }

    public async compare(
        hashedPassword: string,
        plainPassword: string,
    ): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
}
