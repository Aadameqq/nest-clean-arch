import { ApiProperty } from '@nestjs/swagger';
import { Redirect } from '../../core/domain/redirect';

class ReadManySingleRedirectResponse {
    @ApiProperty()
    public readonly id: string;

    @ApiProperty()
    public readonly url: string;

    @ApiProperty()
    public readonly usesAmount: number;

    private constructor(id: string, url: string, usesAmount: number) {
        this.id = id;
        this.url = url;
        this.usesAmount = usesAmount;
    }

    public static fromRedirect(redirect: Redirect) {
        return new ReadManySingleRedirectResponse(
            redirect.id.toString(),
            redirect.url,
            redirect.useCount,
        );
    }
}

export class ReadManyRedirectsResponse {
    @ApiProperty({ type: () => [ReadManySingleRedirectResponse] })
    public readonly redirects: ReadManySingleRedirectResponse[];

    private constructor(redirects: ReadManySingleRedirectResponse[]) {
        this.redirects = redirects;
    }

    public static fromRedirectsList(redirects: Redirect[]) {
        return new ReadManyRedirectsResponse(
            redirects.map((redirect) =>
                ReadManySingleRedirectResponse.fromRedirect(redirect),
            ),
        );
    }
}
