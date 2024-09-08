import { IsNumber, IsString, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { parseEnv } from './config/parse-env';

const trimSlashes = (str: string) => {
    let trimmed = str;
    if (trimmed[0] === '/') {
        trimmed = trimmed.slice(1);
    }
    if (trimmed[trimmed.length - 1] === '/') {
        trimmed = trimmed.slice(0, -1);
    }
    return trimmed;
};

export class WebEnv {
    @IsNumber()
    @Min(0)
    @Max(65535)
    public readonly PORT: number;

    @IsString()
    public readonly SWAGGER_PATH: string;

    @IsString()
    public readonly SWAGGER_TITLE: string;

    @IsString()
    @Transform(({ value }) => trimSlashes(value))
    public readonly SHORTENED_LINK_ROUTE: string;

    @IsString()
    @Transform(({ value }) => trimSlashes(value))
    public readonly DOMAIN: string;
}

export const webEnv = parseEnv(WebEnv);
