export class Token {
    private constructor(private readonly token: string) {}

    public static fromString(token: string) {
        return new Token(token);
    }

    public toString() {
        return this.token;
    }
}
