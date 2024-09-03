import { RedirectId } from './redirect-id';

export class Redirect {
    public constructor(
        public id: RedirectId,

        public url: string,

        public ownerId: string,

        public viewsCount: number = 0,
    ) {}

    public incrementViews() {
        this.viewsCount += 1;
    }
}
