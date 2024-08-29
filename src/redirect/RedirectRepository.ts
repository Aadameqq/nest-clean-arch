import { Redirect } from './Redirect';
import { RedirectId } from './RedirectId';

export interface RedirectRepository {
    getById(id: RedirectId): Promise<Redirect | false>;
    persist(redirect: Redirect): Promise<void>;
    getAllByOwnerId(ownerId: string): Promise<Redirect[]>;
    generateIdentity(): RedirectId;
}
