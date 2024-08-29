import { Injectable } from '@nestjs/common';
import { Redirect } from './Redirect';
import { RedirectRepository } from './RedirectRepository';
import { RedirectNotFoundException } from './RedirectNotFoundException';
import { RedirectId } from './RedirectId';

@Injectable()
export class RedirectService {
    public constructor(private redirectRepository: RedirectRepository) {}

    public async getById(id: RedirectId) {
        const redirect = await this.redirectRepository.getById(id);

        if (!redirect) throw new RedirectNotFoundException();

        redirect.incrementUses(); // TODO: add event
        await this.redirectRepository.persist(redirect);

        return redirect;
    }

    public async create(redirect: Redirect) {
        await this.redirectRepository.persist(redirect);
    }

    public async getAllByOwnerId(ownerId: string) {
        return this.redirectRepository.getAllByOwnerId(ownerId);
    }
}
