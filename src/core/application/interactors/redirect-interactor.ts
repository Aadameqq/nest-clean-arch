import { RedirectId } from '../../domain/redirect-id';
import { Redirect } from '../../domain/redirect';

export abstract class RedirectInteractor {
    public abstract view(id: RedirectId): Promise<Redirect>;
    public abstract create(url: string, ownerId: string): Promise<Redirect>;
    public abstract listForOwner(ownerId: string): Promise<Redirect[]>;
    public abstract remove(id: RedirectId, userId: string): Promise<void>;
}
