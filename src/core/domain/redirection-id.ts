export class RedirectionId {
    private constructor(private readonly id: string) {}

    public static fromString(newId: string) {
        return new RedirectionId(newId);
    }

    public toString() {
        return this.id;
    }
}
