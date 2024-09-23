import { ApiProperty } from '@nestjs/swagger';
import { Redirection } from '../../../core/domain/redirection';
import { generateShortenedUrl } from '../generate-shortened-url';

export class CreateRedirectionResponse {
    @ApiProperty()
    public readonly id: string;

    @ApiProperty()
    public readonly shortenedUrl: string;

    private constructor(id: string, shortenedUrl: string) {
        this.id = id;
        this.shortenedUrl = shortenedUrl;
    }

    public static fromRedirection(redirection: Redirection) {
        return new CreateRedirectionResponse(
            redirection.id.toString(),
            generateShortenedUrl(redirection.slug),
        );
    }
}
