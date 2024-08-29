import { Redirect } from './Redirect';
import { RedirectRepository } from './RedirectRepository';

export class RedirectIdGenerator {
    public constructor(private redirectRepository: RedirectRepository) {}

    public generateNew() {
        return this.redirectRepository.generateIdentity();
    }
}
