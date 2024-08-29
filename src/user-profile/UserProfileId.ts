export class UserProfileId {
    private constructor(private readonly id: string) {}

    public static fromString(newId: string) {
        return new UserProfileId(newId);
    }

    public toString() {
        return this.id;
    }
}
