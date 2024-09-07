import { ApiProperty } from '@nestjs/swagger';

export class CreateRedirectionResponse {
    @ApiProperty()
    public readonly shortenedUrl: string;

    private constructor(shortenedUrl: string) {
        this.shortenedUrl = shortenedUrl;
    }

    public static fromShortenedUrl(shortenedUrl: string) {
        return new CreateRedirectionResponse(shortenedUrl);
    }
}
