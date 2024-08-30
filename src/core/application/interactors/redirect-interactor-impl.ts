import { Injectable } from '@nestjs/common';
import { Redirect } from '../../domain/redirect';
import { RedirectRepository } from '../ports/redirect-repository';
import { RedirectNotFound } from '../../domain/redirect-not-found';
import { RedirectId } from '../../domain/redirect-id';
import { RedirectInteractor } from './redirect-interactor';

@Injectable()
export class RedirectInteractorImpl extends RedirectInteractor {
    public constructor(private redirectRepository: RedirectRepository) {
        super();
    }

    public async view(id: RedirectId) {
        const redirect = await this.redirectRepository.getById(id);

        if (!redirect) throw new RedirectNotFound();

        redirect.incrementUses(); // TODO: add event
        await this.redirectRepository.persist(redirect);

        return redirect;
    }

    public async create(url: string, ownerId: string) {
        const id = this.redirectRepository.generateIdentity(); //TODO:

        const redirect = new Redirect(id, url, ownerId);

        await this.redirectRepository.persist(redirect);

        return redirect;
    }

    public async listForOwner(ownerId: string) {
        return this.redirectRepository.getAllByOwnerId(ownerId);
    }
}
