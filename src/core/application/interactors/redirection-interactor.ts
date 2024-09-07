import { RedirectionId } from '../../domain/redirection-id';
import { Redirection } from '../../domain/redirection';

export abstract class RedirectionInteractor {
    public abstract use(slug: string): Promise<Redirection>;
    public abstract create(url: string, ownerId: string): Promise<Redirection>;
    public abstract listForOwner(ownerId: string): Promise<Redirection[]>;
    public abstract remove(id: RedirectionId, userId: string): Promise<void>;
}
