import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthRequest {
    @IsNotEmpty()
    @ApiProperty({ default: 'TestNickname' })
    public readonly username: string;

    @IsNotEmpty()
    @ApiProperty({ default: 'SecureTestPassword1234_' })
    public readonly password: string;
}
