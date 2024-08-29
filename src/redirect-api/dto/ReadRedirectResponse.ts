import { ApiProperty } from '@nestjs/swagger';
import { Redirect } from '../../redirect/Redirect';

export class ReadRedirectResponse {
    @ApiProperty()
    public readonly url: string;

    private constructor(url: string) {
        this.url = url;
    }

    public static fromRedirect(redirect: Redirect) {
        return new ReadRedirectResponse(redirect.url);
    }
}
