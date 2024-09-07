import { ApiProperty } from '@nestjs/swagger';
import { Redirection } from '../../../core/domain/redirection';
import { ShortenedUrlGenerator } from '../shortened-url-generator';

class ReadManySingleRedirectionResponse {
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

    public static fromRedirection(
        redirection: Redirection,
        shortenedUrlGenerator: ShortenedUrlGenerator,
    ) {
        return new ReadManySingleRedirectionResponse(
            redirection.id.toString(),
            redirection.url,
            shortenedUrlGenerator.generateFromRedirection(redirection),
            redirection.usesCount,
        );
    }
}

export class ReadManyRedirectionsResponse {
    @ApiProperty({ type: () => [ReadManySingleRedirectionResponse] })
    public readonly redirections: ReadManySingleRedirectionResponse[];

    private constructor(redirections: ReadManySingleRedirectionResponse[]) {
        this.redirections = redirections;
    }

    public static fromRedirectionList(
        redirections: Redirection[],
        shortenedUrlGenerator: ShortenedUrlGenerator,
    ) {
        return new ReadManyRedirectionsResponse(
            redirections.map((redirection) =>
                ReadManySingleRedirectionResponse.fromRedirection(
                    redirection,
                    shortenedUrlGenerator,
                ),
            ),
        );
    }
}
