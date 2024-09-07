import {
    IsEnum,
    IsNumber,
    IsString,
    Max,
    Min,
    validateSync,
} from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Environment } from './environment.enum';

export class EnvVariables {
    @IsNumber()
    @Min(0)
    @Max(65535)
    public readonly PORT: number;

    @IsEnum(Environment)
    public readonly NODE_ENV: Environment;

    @IsString()
    public readonly SWAGGER_PATH: string;

    @IsString()
    public readonly SWAGGER_TITLE: string;

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

    @IsString()
    public readonly SHORTENED_LINK_BASE_PATH: string;
}

export const validate = (config: Record<string, unknown>) => {
    const validatedConfig = plainToInstance(EnvVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {});

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
};
