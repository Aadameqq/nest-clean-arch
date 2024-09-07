import { Injectable } from '@nestjs/common';
import { ConfigurationService } from '../../configuration/configuration.service';
import { Redirection } from '../../core/domain/redirection';

@Injectable()
export class ShortenedUrlGenerator {
    private readonly basePath: string;

    public constructor(private configurationService: ConfigurationService) {
        let rawBasePath = this.configurationService.get(
            'SHORTENED_LINK_BASE_PATH',
        );
        if (rawBasePath.endsWith('/')) {
            rawBasePath = rawBasePath.slice(0, -1);
        }
        this.basePath = rawBasePath;
    }

    public generateFromRedirection(redirection: Redirection) {
        return this.generate(redirection.slug);
    }

    public generate(slug: string) {
        return `${this.basePath}/${slug}`;
    }
}
