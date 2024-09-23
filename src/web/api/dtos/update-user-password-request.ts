import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserPasswordRequest {
    @IsNotEmpty()
    @ApiProperty({ default: 'SecureTestPassword1234_' })
    public readonly oldPassword: string;

    @IsNotEmpty()
    @ApiProperty({ default: 'NewMoreSecureTestPassword1234_' })
    public readonly newPassword: string;
}
