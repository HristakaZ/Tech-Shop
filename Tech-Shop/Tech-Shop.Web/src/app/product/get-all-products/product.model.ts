import { Category } from "src/app/category/category.model";
import { Review } from "src/app/review/review.model";

export class Product {
    id!: number;
    name!: string;
    quantity!: number;
    price!: number;
    imagePath!: string;
    photo?: File;
    category: Category = new Category();
    reviews: Review[] = [];
}