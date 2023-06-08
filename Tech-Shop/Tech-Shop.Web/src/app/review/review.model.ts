import { User } from "../user/get-all-users/user.model";

export class Review {
    constructor() {}
    comment?: string;
    rating!: number;
    product!: string;
    user!: User;
}