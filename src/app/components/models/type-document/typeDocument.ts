export class TypeDocument {

    id: number;

    name: string;

    inventoryOutput: boolean;

    description: string;

    constructor() {
        this.id = 0;
        this.name = '';
        this.inventoryOutput = true;
        this.description = '';
    }
}