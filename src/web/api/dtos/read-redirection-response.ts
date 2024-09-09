import { ApiProperty } from '@nestjs/swagger';
import { Redirection } from '../../../core/domain/redirection';
import { generateShortenedUrl } from '../generate-shortened-url';

export class ReadRedirectionResponse {
    @ApiProperty()
    public readonly id: string;

    @ApiProperty()
    public readonly url: string;

    @ApiProperty()
    public readonly shortenedUrl: string;

    @ApiProperty()
    public readonly usesCount: number;

    private constructor(
        id: string,
        url: string,
        shortenedUrl: string,
        usesCount: number,
    ) {
        this.id = id;
        this.url = url;
        this.shortenedUrl = shortenedUrl;
        this.usesCount = usesCount;
    }

    public static fromRedirection(redirection: Redirection) {
        return new ReadRedirectionResponse(
            redirection.id.toString(),
            redirection.url,
            generateShortenedUrl(redirection.slug),
            redirection.usesCount,
        );
    }
}
