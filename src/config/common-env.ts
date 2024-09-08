import { IsEnum } from 'class-validator';
import { parseEnv } from './parse-env';

export enum Environment {
    Production = 'production',
    Development = 'development',
    Test = 'test',
}

class CommonEnv {
    @IsEnum(Environment)
    public readonly NODE_ENV: Environment;

    public isDevelopment() {
        return this.NODE_ENV === Environment.Development;
    }

    public isEnvironment(environment: Environment) {
        return this.NODE_ENV === environment;
    }
}

export const commonEnv = parseEnv(CommonEnv);
