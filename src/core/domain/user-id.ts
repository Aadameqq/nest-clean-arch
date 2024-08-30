export class UserId {
    private constructor(private readonly id: string) {}

    public static fromString(newId: string) {
        return new UserId(newId);
    }

    public toString() {
        return this.id;
    }
}
