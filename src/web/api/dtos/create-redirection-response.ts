import { ApiProperty } from '@nestjs/swagger';
import { Redirection } from '../../../core/domain/redirection';
import { generateShortenedUrl } from '../generate-shortened-url';

export class CreateRedirectionResponse {
    @ApiProperty()
    public readonly shortenedUrl: string;

    private constructor(shortenedUrl: string) {
        this.shortenedUrl = shortenedUrl;
    }

    public static fromRedirection(redirection: Redirection) {
        return new CreateRedirectionResponse(
            generateShortenedUrl(redirection.slug),
        );
    }
}
