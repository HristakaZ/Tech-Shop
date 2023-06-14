export class User {
    id!: number;
    email!: string;
    name!: string;
    address!: string;
    phoneNumber!: string;
    role!: string;
}

export class UserTotalCount {
    users: User[] = [];
    totalCount!: number;
}