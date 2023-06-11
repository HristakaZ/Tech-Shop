export class UpdateProductModel {
    constructor(
        name: string,
        quantity: number,
        price: number,
        categoryID: number,
        photo?: File | null) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.categoryID = categoryID;
        this.photo = photo;
    }
    name!: string;
    quantity!: number;
    price!: number;
    categoryID!: number;
    photo?: File | null;
}