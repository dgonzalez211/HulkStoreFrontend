export class Customer {
    id: number;
    name: string;
    lastName: string;
    surName: string;
    provider: boolean;

    constructor() {
        this.id = 0;
        this.name = '';
        this.lastName = '';
        this.surName = '';
        this.provider = false;
    }
}