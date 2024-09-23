import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class CreateRedirectionRequest {
    @ApiProperty({ default: 'http://domain.somedomain' })
    @IsUrl()
    public readonly url: string;
}
