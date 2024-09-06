import { RedirectionId } from './redirection-id';

export class Redirection {
    public constructor(
        public id: RedirectionId,

        public url: string,

        public ownerId: string,

        public usesCount: number = 0,
    ) {}

    public incrementUses() {
        this.usesCount += 1;
    }

    public isOwnedBy(ownerId: string) {
        return ownerId === this.ownerId;
    }
}
