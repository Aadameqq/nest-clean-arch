import { RedirectViewed } from '../../domain/redirect-viewed';
import { RedirectRepository } from '../ports/redirect-repository';
import { RedirectViewedObservable } from '../ports/redirect-viewed-observable';
import { RedirectViewedObserver } from '../ports/redirect-viewed-observer';

export class ViewsCountOnRedirectViewed implements RedirectViewedObserver {
    public constructor(
        private redirectRepository: RedirectRepository,
        private redirectViewedObservable: RedirectViewedObservable,
    ) {
        this.redirectViewedObservable.subscribe(this);
    }

    public async update(event: RedirectViewed) {
        const redirect = await this.redirectRepository.getById(
            event.redirectId,
        );
        if (!redirect) return;

        redirect.incrementViews();

        await this.redirectRepository.persist(redirect);
    }
}
