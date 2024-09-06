import { Injectable } from '@nestjs/common';
import { Redirection } from '../../domain/redirection';
import { RedirectionRepository } from '../ports/redirection-repository';
import { NoSuchRedirection } from '../../domain/no-such-redirection';
import { RedirectionId } from '../../domain/redirection-id';
import { RedirectionInteractor } from './redirection-interactor';
import { RedirectionUsedObservable } from '../ports/redirection-used-observable';
import { RedirectionUsed } from '../../domain/redirection-used';
import { UserIsNotRedirectionOwner } from '../../domain/user-is-not-redirection-owner';

@Injectable()
export class RedirectionInteractorImpl extends RedirectionInteractor {
    public constructor(
        private redirectionRepository: RedirectionRepository,
        private redirectionUsedObservable: RedirectionUsedObservable,
    ) {
        super();
    }

    public async use(id: RedirectionId) {
        const redirection = await this.redirectionRepository.getById(id);

        if (!redirection) throw new NoSuchRedirection();

        this.redirectionUsedObservable.publish(
            new RedirectionUsed(redirection.id),
        );

        return redirection;
    }

    public async create(url: string, ownerId: string) {
        const id = this.redirectionRepository.generateIdentity();

        const redirection = new Redirection(id, url, ownerId);

        await this.redirectionRepository.persist(redirection);

        return redirection;
    }

    public async listForOwner(ownerId: string) {
        return this.redirectionRepository.getAllByOwnerId(ownerId);
    }

    public async remove(id: RedirectionId, userId: string) {
        const found = await this.redirectionRepository.getById(id);

        if (!found) throw new NoSuchRedirection();

        if (!found.isOwnedBy(userId)) throw new UserIsNotRedirectionOwner();

        await this.redirectionRepository.remove(found);
    }
}
