import { IsNumber, IsString } from 'class-validator';
import { parseEnv } from '../../config/parse-env';

class CoreEnv {
    @IsString()
    public readonly JWT_SECRET: string;

    @IsString()
    public readonly DATABASE_URL: string;

    @IsNumber()
    public readonly PASSWORD_SALT_ROUNDS: number;

    @IsNumber()
    public readonly JWT_EXPIRATION_TIME_IN_SECONDS: number;

    @IsNumber()
    public readonly SLUG_LENGTH: number;
}

export const coreEnv = parseEnv(CoreEnv);
