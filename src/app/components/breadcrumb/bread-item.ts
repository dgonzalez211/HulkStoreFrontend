export class BreadItem {
    active: any ;
    title: String;
    link: String;
    breads: Array<BreadItem>;
    constructor() {
        this.breads = new Array<BreadItem>();
        this.title='';
        this.link='';
    }
}