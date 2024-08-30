import { ApiProperty } from '@nestjs/swagger';
import { RedirectId } from '../../redirect/RedirectId';
import { Redirect } from '../../redirect/Redirect';

export class CreateRedirectRequest {
    @ApiProperty()
    public readonly url: string;

    public toRedirect(id: RedirectId, ownerId: string) {
        return new Redirect(id, this.url, ownerId);
    }
}
