import { ApiProperty } from '@nestjs/swagger';
import { Token } from '../../../core/domain/token';

export class CreateAuthResponse {
    @ApiProperty()
    public readonly token: string;

    private constructor(token: string) {
        this.token = token;
    }

    public static fromToken(token: Token) {
        return new CreateAuthResponse(token.toString());
    }
}
