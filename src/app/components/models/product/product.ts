import { Category } from "./category";

export class Product {
    id: number;

    name: string;

    description: string;

    stock: number;

    price: number;

    categories: Array<Category>;

    constructor() {
        this.id = 0;
        this.name = '';
        this.description = '';
        this.stock = 0;
        this.price = 0;
        this.categories = Array<Category>();
    }
}