import { ApiProperty } from '@nestjs/swagger';
import { Redirection } from '../../../core/domain/redirection';

class ReadManySingleRedirectionResponse {
    @ApiProperty()
    public readonly id: string;

    @ApiProperty()
    public readonly url: string;

    @ApiProperty()
    public readonly usesCount: number;

    private constructor(id: string, url: string, usesCount: number) {
        this.id = id;
        this.url = url;
        this.usesCount = usesCount;
    }

    public static fromRedirection(redirection: Redirection) {
        return new ReadManySingleRedirectionResponse(
            redirection.id.toString(),
            redirection.url,
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

    public static fromRedirectionList(redirections: Redirection[]) {
        return new ReadManyRedirectionsResponse(
            redirections.map((redirection) =>
                ReadManySingleRedirectionResponse.fromRedirection(redirection),
            ),
        );
    }
}
