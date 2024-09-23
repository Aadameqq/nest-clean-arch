import { Redirection } from '../../domain/redirection';
import { RedirectionId } from '../../domain/redirection-id';

export interface RedirectionRepository {
    getById(id: RedirectionId): Promise<Redirection | false>;
    persist(redirection: Redirection): Promise<void>;
    getAllByOwnerId(ownerId: string): Promise<Redirection[]>;
    getByOwnerAndUrl(
        url: string,
        ownerId: string,
    ): Promise<Redirection | false>;
    generateIdentity(): RedirectionId;
    remove(redirection: Redirection): Promise<void>;
    getBySlug(slug: string): Promise<Redirection | false>;
}
