import { RedirectId } from './redirect-id';

export class Redirect {
    constructor(
        public id: RedirectId,

        public url: string,

        public ownerId: string,

        public useCount: number = 0,
    ) {}

    public incrementUses() {
        this.useCount += 1;
    }
}
