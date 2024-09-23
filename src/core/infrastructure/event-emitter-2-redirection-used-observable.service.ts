import { EventEmitter2 } from 'eventemitter2';
import { Injectable } from '@nestjs/common';
import { RedirectionUsedObservable } from '../application/ports/redirection-used-observable';
import { RedirectionUsedObserver } from '../application/ports/redirection-used-observer';
import { RedirectionUsed } from '../domain/redirection-used';

@Injectable()
export class EventEmitter2RedirectionUsedObservable
    implements RedirectionUsedObservable
{
    private readonly eventName = 'redirection_used';

    private readonly eventEmitter = new EventEmitter2();

    public subscribe(observer: RedirectionUsedObserver) {
        const callback = observer.update.bind(observer);

        this.eventEmitter.on(this.eventName, callback, {
            async: true,
        });
    }

    public async publish(event: RedirectionUsed) {
        try {
            await this.eventEmitter.emitAsync(this.eventName, event);
        } catch (ex) {
            console.error('Error in event'); // TODO: add logging
        }
    }
}
