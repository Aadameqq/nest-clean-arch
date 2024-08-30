import { Redirect } from '../../domain/redirect';
import { RedirectId } from '../../domain/redirect-id';

export interface RedirectRepository {
    getById(id: RedirectId): Promise<Redirect | false>;
    persist(redirect: Redirect): Promise<void>;
    getAllByOwnerId(ownerId: string): Promise<Redirect[]>;
    generateIdentity(): RedirectId;
}
