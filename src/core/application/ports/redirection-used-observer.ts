import { RedirectionUsed } from '../../domain/redirection-used';

export interface RedirectionUsedObserver {
    update(event: RedirectionUsed): void;
}
