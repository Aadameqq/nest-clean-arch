import { EventEmitter2 } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { RedirectionUsedObservable } from '../application/ports/redirection-used-observable';
import { RedirectionUsedObserver } from '../application/ports/redirection-used-observer';
import { RedirectionUsed } from '../domain/redirection-used';

@Injectable()
export class NestRedirectionUsedObservable
    implements RedirectionUsedObservable
{
    private readonly eventName = 'redirection_used';

    public constructor(private readonly nestEventEmitter: EventEmitter2) {}

    public subscribe(observer: RedirectionUsedObserver) {
        const callback = observer.update.bind(observer);

        this.nestEventEmitter.on(this.eventName, callback, {
            async: true,
        });
    }

    public async publish(event: RedirectionUsed) {
        try {
            await this.nestEventEmitter.emitAsync(this.eventName, event);
        } catch (ex) {
            console.error('Error in event'); // TODO: add logging
        }
    }
}
