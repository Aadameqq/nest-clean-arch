import { Injectable } from '@nestjs/common';
import { Redirect } from '../../domain/redirect';
import { RedirectRepository } from '../ports/redirect-repository';
import { NoSuchRedirect } from '../../domain/no-such-redirect';
import { RedirectId } from '../../domain/redirect-id';
import { RedirectInteractor } from './redirect-interactor';
import { RedirectViewedObservable } from '../ports/redirect-viewed-observable';
import { RedirectViewed } from '../../domain/redirect-viewed';
import { UserIsNotRedirectOwner } from '../../domain/user-is-not-redirect-owner';

@Injectable()
export class RedirectInteractorImpl extends RedirectInteractor {
    public constructor(
        private redirectRepository: RedirectRepository,
        private redirectViewedObservable: RedirectViewedObservable,
    ) {
        super();
    }

    public async view(id: RedirectId) {
        const redirect = await this.redirectRepository.getById(id);

        if (!redirect) throw new NoSuchRedirect();

        this.redirectViewedObservable.publish(new RedirectViewed(redirect.id));

        return redirect;
    }

    public async create(url: string, ownerId: string) {
        const id = this.redirectRepository.generateIdentity();

        const redirect = new Redirect(id, url, ownerId);

        await this.redirectRepository.persist(redirect);

        return redirect;
    }

    public async listForOwner(ownerId: string) {
        return this.redirectRepository.getAllByOwnerId(ownerId);
    }

    public async remove(id: RedirectId, userId: string) {
        const found = await this.redirectRepository.getById(id);

        if (!found) throw new NoSuchRedirect();

        if (!found.isOwnedBy(userId)) throw new UserIsNotRedirectOwner();

        await this.redirectRepository.remove(found);
    }
}
