export class UpdateUserModel {
    constructor(email: string,
        name: string,
        address: string,
        phoneNumber: string) {
            this.email = email;
            this.name = name;
            this.address = address;
            this.phoneNumber = phoneNumber;
    }
    email!: string;
    name!: string;
    address!: string;
    phoneNumber!: string;
}