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
    PORT: number;

    @IsEnum(Environment)
    NODE_ENV: Environment;

    @IsString()
    SWAGGER_PATH: string;

    @IsString()
    SWAGGER_TITLE: string;

    @IsString()
    JWT_SECRET: string;

    @IsString()
    DATABASE_URL: string;

    @IsNumber()
    PASSWORD_SALT_ROUNDS: number;

    @IsNumber()
    JWT_EXPIRATION_TIME_IN_SECONDS: number;
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
