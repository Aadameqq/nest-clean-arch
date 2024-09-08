import * as nanoid from 'nanoid';
import { Injectable } from '@nestjs/common';
import { SlugGenerator } from '../application/ports/slug-generator';
import { coreEnv } from './core-env';

@Injectable()
export class NanoidSlugGenerator implements SlugGenerator {
    public generate(): string {
        return nanoid.nanoid(coreEnv.SLUG_LENGTH);
    }
}
