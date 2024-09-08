import { IsEnum } from 'class-validator';
import { parseConfig } from './parse-config';

export enum Environment {
    Production = 'production',
    Development = 'development',
    Test = 'test',
}

class CommonConfig {
    @IsEnum(Environment)
    public readonly NODE_ENV: Environment;

    public isDevelopment() {
        return this.NODE_ENV === Environment.Development;
    }

    public isEnvironment(environment: Environment) {
        return this.NODE_ENV === environment;
    }
}

export const commonConfig = parseConfig(CommonConfig);
