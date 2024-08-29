export class AuthUser {
    public constructor(
        public readonly id: string,
        public readonly username: string,
        public password: string,
    ) {}

    public setPassword(newPassword: string) {
        this.password = newPassword;
    }
}
