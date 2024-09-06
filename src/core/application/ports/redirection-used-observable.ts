import { RedirectionUsedObserver } from './redirection-used-observer';
import { RedirectionUsed } from '../../domain/redirection-used';

export interface RedirectionUsedObservable {
    subscribe(observer: RedirectionUsedObserver): void;
    publish(event: RedirectionUsed): void;
}
