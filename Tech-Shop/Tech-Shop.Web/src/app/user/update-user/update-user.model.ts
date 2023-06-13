export class UpdateUserModel {
    constructor(
        name: string,
        address: string,
        phoneNumber: string) {
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
    name!: string;
    address!: string;
    phoneNumber!: string;
}