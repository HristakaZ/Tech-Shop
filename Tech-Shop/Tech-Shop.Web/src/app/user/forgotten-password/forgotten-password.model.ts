export class ForgottenPasswordModel {
    constructor(email: string) {
        this.email = email;
    }
    email!: string;
}