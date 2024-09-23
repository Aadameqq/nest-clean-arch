import { RedirectionUsed } from '../../domain/redirection-used';
import { RedirectionRepository } from '../ports/redirection-repository';
import { RedirectionUsedObservable } from '../ports/redirection-used-observable';
import { RedirectionUsedObserver } from '../ports/redirection-used-observer';

export class UsesCountOnRedirectionUsed implements RedirectionUsedObserver {
    public constructor(
        private redirectionRepository: RedirectionRepository,
        private redirectionUsedObservable: RedirectionUsedObservable,
    ) {
        this.redirectionUsedObservable.subscribe(this);
    }

    public async update(event: RedirectionUsed) {
        const redirection = await this.redirectionRepository.getById(
            event.redirectionId,
        );
        if (!redirection) return;

        redirection.incrementUses();

        await this.redirectionRepository.persist(redirection);
    }
}
