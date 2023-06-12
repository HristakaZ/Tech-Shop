export class PlaceOrderModel {
    constructor(address: string,
        productIDs: number[]) {
        this.address = address;
        this.productIDs = productIDs;
    }
    address!: string;
    productIDs: number[] = [];
}