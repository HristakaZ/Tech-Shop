import { Category } from "src/app/category/category.model";

export class Product {
    id!: number;
    name!: string;
    quantity!: number;
    price!: number;
    imagePath?: string;
    category!: Category;
    //TO DO: afterwards add reviews
}