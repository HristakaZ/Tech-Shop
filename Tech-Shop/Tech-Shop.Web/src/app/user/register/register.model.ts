export class RegisterModel {
    constructor(email: string,
        password: string,
        name: string,
        address: string,
        phoneNumber: string) {
            this.email = email;
            this.password = password;
            this.name = name;
            this.address = address;
            this.phoneNumber = phoneNumber;
    }

    email!: string;
    password!: string;
    name!: string;
    address!: string;
    phoneNumber!: string;
}