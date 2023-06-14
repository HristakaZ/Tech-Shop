export class Category {
    id?: number;
    name!: string;
}

export class CategoryTotalCount {
    categories: Category[] = [];
    totalCount!: number;
}