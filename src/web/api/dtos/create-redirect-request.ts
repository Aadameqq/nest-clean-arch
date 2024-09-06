import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class CreateRedirectRequest {
    @ApiProperty({ default: 'domain.domain' })
    @IsUrl()
    public readonly url: string;
}
