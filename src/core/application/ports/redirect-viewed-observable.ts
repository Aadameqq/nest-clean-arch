import { RedirectViewedObserver } from './redirect-viewed-observer';
import { RedirectViewed } from '../../domain/redirect-viewed';

export interface RedirectViewedObservable {
    subscribe(observer: RedirectViewedObserver): void;
    publish(event: RedirectViewed): void;
}
