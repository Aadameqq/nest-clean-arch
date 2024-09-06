import { ApiProperty } from '@nestjs/swagger';
import { Redirection } from '../../../core/domain/redirection';

export class CreateRedirectionResponse {
    @ApiProperty()
    public readonly id: string;

    private constructor(id: string) {
        this.id = id;
    }

    public static fromRedirection(redirection: Redirection) {
        return new CreateRedirectionResponse(redirection.id.toString());
    }
}
