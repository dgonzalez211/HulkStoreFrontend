import { Product } from "../product/product";

export class CommercialDocumentDetail{    
    id:number;

    product:Product;

    quantity:number;

    unitValue:number;

    constructor(){
        this.id=0;
        this.product= new Product();
        this.quantity=0;
        this.unitValue=0;
    }
}