export class CreateReviewModel {
    constructor(rating: number,
        productID: number,
        comment?: string) {
        this.rating = rating;
        this.productID = productID;
        this.comment = comment;
    }
    comment?: string;
    rating!: number;
    productID!: number;
}