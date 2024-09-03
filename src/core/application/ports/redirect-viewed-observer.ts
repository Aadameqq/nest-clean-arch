import { RedirectViewed } from '../../domain/redirect-viewed';

export interface RedirectViewedObserver {
    update(event: RedirectViewed): void;
}
