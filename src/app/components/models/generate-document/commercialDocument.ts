import {Customer} from "../customer/customer";
import {TypeDocument} from "../type-document/typeDocument";
import {CommercialDocumentDetail} from "./commercialDocumentDetail";

export class CommercialDocument {

    id: number;

    customer: Customer;

    consecutive: Number;

    typeDocument: TypeDocument;

    totalValue: number;

    totalLetters: string;

    details: Array<CommercialDocumentDetail>;

    constructor() {
        this.id = 0;
        this.customer = new Customer();
        this.consecutive = 0;
        this.typeDocument = new TypeDocument();
        this.totalValue = 0;
        this.totalLetters = '';
        this.details = new Array<CommercialDocumentDetail>();
    }

}
