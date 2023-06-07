import { User } from "../user/get-all-users/user.model";

export class Review {
    constructor(rating: number,
        product: string,
        user: User,
        comment?: string) {
        this.rating = rating;
        this.product = product;
        this.user = user;
        this.comment = comment;
    }
    comment?: string;
    rating!: number;
    product!: string;
    user!: User;
}