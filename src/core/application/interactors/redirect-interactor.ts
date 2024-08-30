import { RedirectId } from '../../domain/redirect-id';
import { Redirect } from '../../domain/redirect';

export abstract class RedirectInteractor {
    abstract view(id: RedirectId): Promise<Redirect>;
    abstract create(url: string, ownerId: string): Promise<Redirect>;
    abstract listForOwner(ownerId: string): Promise<Redirect[]>;
}
