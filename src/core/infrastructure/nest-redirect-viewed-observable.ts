import { EventEmitter2 } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { RedirectViewedObservable } from '../application/ports/redirect-viewed-observable';
import { RedirectViewedObserver } from '../application/ports/redirect-viewed-observer';
import { RedirectViewed } from '../domain/redirect-viewed';

@Injectable()
export class NestRedirectViewedObservable implements RedirectViewedObservable {
    private readonly eventName = 'redirect_viewed';

    public constructor(private readonly nestEventEmitter: EventEmitter2) {}

    public subscribe(observer: RedirectViewedObserver) {
        const callback = observer.update.bind(observer);

        this.nestEventEmitter.on(this.eventName, callback, {
            async: true,
        });
    }

    public async publish(event: RedirectViewed) {
        try {
            await this.nestEventEmitter.emitAsync(this.eventName, event);
        } catch (ex) {
            console.error('Error in event'); // TODO: add logging
        }
    }
}
