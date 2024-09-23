import * as nanoid from 'nanoid';
import { Injectable } from '@nestjs/common';
import { SlugGenerator } from '../application/ports/slug-generator';
import { coreConfig } from './core-config';

@Injectable()
export class NanoidSlugGenerator implements SlugGenerator {
    public generate(): string {
        return nanoid.nanoid(coreConfig.SLUG_LENGTH);
    }
}
