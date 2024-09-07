import * as nanoid from 'nanoid';
import { Injectable } from '@nestjs/common';
import { SlugGenerator } from '../application/ports/slug-generator';
import { ConfigurationService } from '../../configuration/configuration.service';

@Injectable()
export class NanoidSlugGenerator implements SlugGenerator {
    public constructor(
        private readonly configurationService: ConfigurationService,
    ) {}

    public generate(): string {
        return nanoid.nanoid(this.configurationService.get('SLUG_LENGTH'));
    }
}
