import { ProductPhoto } from "src/app/product/product-photo.model";
import { User } from "src/app/user/get-all-users/user.model";

export class Order {
    constructor(id: number,
        address: string,
        status: string,
        products: ProductPhoto[],
        user: User) {
        this.id = id;
        this.address = address;
        this.status = status;
        this.products = products;
        this.user = user;
    }
    id!: number;
    address!: string;
    status!: string;
    products: ProductPhoto[] = [];
    user: User = new User();
}