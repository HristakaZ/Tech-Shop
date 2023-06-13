export class ChangePasswordModel {
    constructor(oldPassword: string,
        newPassword: string,
        confirmNewPassword: string) {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
        this.confirmNewPassword = confirmNewPassword;
    }
    oldPassword!: string;
    newPassword!: string;
    confirmNewPassword!: string;
}