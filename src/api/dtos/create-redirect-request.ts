import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class CreateRedirectRequest {
    @ApiProperty()
    @IsUrl()
    public readonly url: string;
}
