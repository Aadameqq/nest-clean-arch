export class RedirectId {
    private constructor(private readonly id: string) {}

    public static fromString(newId: string) {
        return new RedirectId(newId);
    }

    public toString() {
        return this.id;
    }
}
