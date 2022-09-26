import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { DocumentsService } from 'src/app/services/document/documents.service';
import { ProductService } from 'src/app/services/product/product.service';
import { SnackAlertComponent } from '../../snack-alert/snack-alert.component';
import { Customer } from '../customer/customer';
import { Product } from '../product/product';
import { TypeDocument } from '../type-document/typeDocument';
import { CommercialDocument } from './commercialDocument';
import { CommercialDocumentDetail } from './commercialDocumentDetail';

@Component({
  selector: 'app-generate-document',
  templateUrl: './generate-document.component.html',
  styleUrls: ['./generate-document.component.css']
})
export class GenerateDocumentComponent implements OnInit {

  @ViewChild('tableGenerate', { static: false })
  tableGenerate!: MatTable<any>;
  bread = {
    title: 'Generate documents',
    breads: [{
      active: false,
      title: 'Home',
      link: '/home'
    },
    {
      active: true,
      title: 'Generate documents',
      link: '/home/generate'
    }]
  };
  documentypeSearch: Array<TypeDocument>;
  customerSearch: Array<Customer>;
  productSearch: Array<Product>;
  isLoadingResults = false;
  commercialDocument: CommercialDocument;
  indexRowProduct = -1;
  displayedColumns = ['item_description', 'quantity', 'unit_price', 'total'];
  constructor(
    private service: DocumentsService,
    private customerService: CustomerService,
    private productService: ProductService,
    private _snackBar: MatSnackBar
  ) {
    this.documentypeSearch = new Array<TypeDocument>();
    this.customerSearch = new Array<Customer>();
    this.productSearch = new Array<Product>();
    this.commercialDocument = new CommercialDocument();
    this.commercialDocument.details.push(new CommercialDocumentDetail());
  }

  ngOnInit(): void {
  }

  typeHeadDocumentType(event: any) {
    if (this.validExclude(event.key)) {
      this.service.typeHeadSearchTypeDocument(event.target.value).subscribe(data => {
        this.documentypeSearch = data;
      });
    }
  }

  typeHeadCustomer(event: any) {
    if (this.validExclude(event.key)) {
      this.customerService.typeHeadSearch(event.target.value).subscribe(data => {
        this.customerSearch = data;
      });
    }
  }

  typeHeadProductInput(event: any) {
    if (this.validExclude(event.key)) {
      this.productService.typeHeadSearch(event.target.value).subscribe(data => {

        this.productSearch = data;
      });
    }
  }


  validExclude(key: any): boolean {
    const exclude = ['Tab', 'Shift', 'Control', 'Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Escape', 'Alt'];
    const valid = exclude.indexOf(key);
    return (valid === -1);
  }

  displayTypeDocumeFn(document: TypeDocument): string {
    return (document) ? document.name : '';
  }

  displayCustomerFn(customer: Customer): string {
    return (customer) ? customer.name : '';
  }

  selectDocumentType(document: TypeDocument) {
    this.commercialDocument.typeDocument = document;
  }

  selectCustomer(customer: Customer) {
    this.commercialDocument.customer = customer;
  }
  cleanProduct(row: CommercialDocumentDetail) {
    row.product = new Product();
  }

  displayProductFn(product?: Product): string {
    return (product) ? product.name : '';
  }

  selectProduct(product: Product, index: number) {
    this.commercialDocument.details[index].product = product;
    this.indexRowProduct = -1;
    this.productSearch = new Array<Product>();
  }

  setValuesDetail(detail: CommercialDocumentDetail, reset: boolean) {
    if (reset === true) {
      detail.unitValue = 0;
    } else {
      detail.unitValue = detail.product.price;
    }
  }

  removeRow(index: number) {
    this.commercialDocument.details.splice(index, 1);
    this.total();
    if (this.commercialDocument.details.length === 0) {
      this.commercialDocument.details.push(new CommercialDocumentDetail());
    }
    this.tableGenerate.renderRows();
  }

  total(): number {
    let total = 0;
    this.commercialDocument.details.forEach(d => {

      if (d.unitValue > 0 && d.quantity > 0) {
        total += (d.unitValue * d.quantity);
      }
    });

    return total;
  }


  addNewRow(): void {
    if (this.validateDetails(this.commercialDocument.typeDocument.inventoryOutput)) {
      this.commercialDocument.details.push(new CommercialDocumentDetail());
      if (this.tableGenerate) {
        this.tableGenerate.renderRows();
      }
    } else {

      this._snackBar.openFromComponent(SnackAlertComponent,
        {
          data: {
            type: 'error',
            message: 'The row you are trying to enter is not valid'
          },
          panelClass: 'error'
        });
    }
  }

  validateDetails(into: boolean): boolean {
    let rps = true;
    if (this.commercialDocument.details.length == 0) {
      return false;
    }
    this.commercialDocument.details.forEach(d => {

      if (d.product == null || d.product.id == 0 || d.product.id === null || d.product.id === undefined) {
        rps = false;
      }

      if (d.quantity <= 0) {
        rps = false;
      }

      if (into === true) {
        if (d.quantity <= 0 || d.quantity > d.product.stock) {
          rps = false;
        }
      }
    });
    return rps;
  }

  existStockItem(item: any): boolean {
    let rps = false;
    if (item.id > 0) {

      for (const element of this.commercialDocument.details) {
        if (element.product.id === item.id) {
          rps = true;
          break;
        }
      }
    }
    return rps;
  }

  generate() {
    if (this.isLoadingResults === false) {
      if (this.validateDocument() === true) {
        this.isLoadingResults = true;
        let total =0;
        this.commercialDocument.details.forEach(d=>{
          total+=d.unitValue*d.quantity;
        });
        this.commercialDocument.totalValue=total;
        this.service.save(this.commercialDocument).subscribe({
          next: (response) => {

            this._snackBar.openFromComponent(SnackAlertComponent,
              {
                data: {
                  type: 'success',
                  message: `document # ${response.consecutive}`
                },
                panelClass: 'success'
              });

            this.commercialDocument = new CommercialDocument();
            this.commercialDocument.totalValue = 0;
            this.commercialDocument.details.push(new CommercialDocumentDetail());
            this.productSearch = new Array<Product>();
          }, error: () => { this.isLoadingResults = false; }
          , complete: () => { this.isLoadingResults = false; }
        });
      } else {
        this._snackBar.openFromComponent(SnackAlertComponent,
          {
            data: {
              type: 'error',
              message: 'Please complete the whole document'
            },
            panelClass: 'error'
          });
      }
    }
  }

  validateDocument(): boolean {
    if (this.commercialDocument.customer == undefined || this.commercialDocument.customer.id == 0) {
      return false;
    }

    if (this.commercialDocument.typeDocument == undefined || this.commercialDocument.typeDocument.id == 0) {
      return false;
    }

    return true;
  }

  validCustomer(customer:Customer):boolean{
    if(this.commercialDocument.typeDocument && this.commercialDocument.typeDocument.inventoryOutput){
      return customer.provider==false;
    }else{
      return customer.provider==true;
    }
  }

}
