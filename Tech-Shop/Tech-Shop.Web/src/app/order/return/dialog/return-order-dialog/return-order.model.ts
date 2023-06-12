export class ReturnOrderModel {
    constructor(id: number,
        address: string) {
        this.id = id;
        this.address = address;
    }
    id!: number;
    address!: string;
}