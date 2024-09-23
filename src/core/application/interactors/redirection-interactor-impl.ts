import { Injectable } from '@nestjs/common';
import { Redirection } from '../../domain/redirection';
import { RedirectionRepository } from '../ports/redirection-repository';
import { NoSuchRedirection } from '../../domain/no-such-redirection';
import { RedirectionId } from '../../domain/redirection-id';
import { RedirectionInteractor } from './redirection-interactor';
import { RedirectionUsedObservable } from '../ports/redirection-used-observable';
import { RedirectionUsed } from '../../domain/redirection-used';
import { UserIsNotRedirectionOwner } from '../../domain/user-is-not-redirection-owner';
import { SlugGenerator } from '../ports/slug-generator';
import { RedirectionAlreadyExistsForOwner } from '../../domain/RedirectionAlreadyExistsForOwner';

@Injectable()
export class RedirectionInteractorImpl extends RedirectionInteractor {
    public constructor(
        private redirectionRepository: RedirectionRepository,
        private redirectionUsedObservable: RedirectionUsedObservable,
        private slugGenerator: SlugGenerator,
    ) {
        super();
    }

    public async viewOne(id: RedirectionId, ownerId: string) {
        const redirection = await this.redirectionRepository.getById(id);

        if (!redirection) throw new NoSuchRedirection();

        if (!redirection.isOwnedBy(ownerId))
            throw new UserIsNotRedirectionOwner();

        return redirection;
    }

    public async use(slug: string) {
        const redirection = await this.redirectionRepository.getBySlug(slug);

        if (!redirection) throw new NoSuchRedirection();

        this.redirectionUsedObservable.publish(
            new RedirectionUsed(redirection.id),
        );

        return redirection;
    }

    public async create(url: string, ownerId: string) {
        const found = await this.redirectionRepository.getByOwnerAndUrl(
            url,
            ownerId,
        );

        if (found) throw new RedirectionAlreadyExistsForOwner(found);

        const id = this.redirectionRepository.generateIdentity();
        const slug = this.slugGenerator.generate();

        const redirection = new Redirection(id, url, ownerId, slug);

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
