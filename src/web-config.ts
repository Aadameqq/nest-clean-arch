import { IsNumber, IsString, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { parseConfig } from './config/parse-config';
import { trimSlashes } from './web/create-url';

export class WebConfig {
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

export const webConfig = parseConfig(WebConfig);
