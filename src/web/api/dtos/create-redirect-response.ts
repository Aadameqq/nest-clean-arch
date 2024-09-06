import { ApiProperty } from '@nestjs/swagger';
import { Redirect } from '../../../core/domain/redirect';

export class CreateRedirectResponse {
    @ApiProperty()
    public readonly id: string;

    private constructor(id: string) {
        this.id = id;
    }

    public static fromRedirect(redirect: Redirect) {
        return new CreateRedirectResponse(redirect.id.toString());
    }
}
