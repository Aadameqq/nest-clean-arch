import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';

expand(config());

type Constructor<T> = {
    new (...args: unknown[]): T;
};

export const parseConfig = <T extends object>(
    configClass: Constructor<T>,
): T => {
    const validatedConfig = plainToInstance(configClass, process.env, {
        enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {});

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
};
