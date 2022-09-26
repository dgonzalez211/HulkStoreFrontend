import { Component, HostListener, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackAlertComponent } from 'src/app/components/snack-alert/snack-alert.component';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from '../../product';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.css']
})
export class ProductManagerComponent implements OnInit {

  bread = {
    title: 'Products',
    breads: [{
      active: false,
      title: 'Home',
      link: '/home'
    },
    {
      active: false,
      title: 'Products',
      link: '/home/product'
    }, {
      active: true,
      title: 'Manage products',
      link: '/home/product-manager'
    }]
  };
  isLoadingResults = false;
  routerid!: number;
  form!: UntypedFormGroup;
  product!: Product;
  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private _snackBar: MatSnackBar,
    private service: ProductService,
    private activateRouter: ActivatedRoute,
  ) {
    this.product = new Product();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: [this.product.name, [Validators.minLength(3), Validators.maxLength(90)]],
      description: [this.product.description, [Validators.required, Validators.minLength(5)]],
      stock: [{value:this.product.stock,disabled:true}, [Validators.min(0)]],
      price: [this.product.price, [Validators.min(0)]]
    });

    this.form.valueChanges.subscribe(data => {
      this.product.name = data.name;
      this.product.description = data.description;
      this.product.price = data.price;
    });
  }


  validateOid(): boolean {
    return (this.product.id !== 0 && this.product.id !== undefined);
  }

  @HostListener('window:keydown.control.s')
  onSubmit() {
    if (this.form.valid) {
      this.isLoadingResults = true;

      this.service.save(this.product).subscribe(

        {
          next: (rps) => {
            this.clear();
            this.isLoadingResults = false;
            this._snackBar.openFromComponent(SnackAlertComponent,
              {
                data: {
                  type: 'success',
                  message: 'Transacción exitosa',
                },
                panelClass: 'success',
                duration: 3000
              });
          },error: (e)=>{
            this.isLoadingResults = false;
          }
        });
    } else {
      this._snackBar.openFromComponent(SnackAlertComponent,
        {
          data: {
            type: 'warning',
            message: 'Debes completar todo el formulario'
          },
          panelClass: 'warning',
          duration: 3000
        });
    }
  }

  looadCustomer(product: Product) {
    this.isLoadingResults = false;
    this.product = product;
    this.bread.breads[this.bread.breads.length - 1].title = this.product.name;
    this.createForm();
  }


  clear() {
    this.product = new Product();
    this.form.reset();
    this.bread.breads[this.bread.breads.length - 1].title = 'Administrar clientes';
  }

  ngOnInit(): void {
    this.createForm();
    this.routerid = this.activateRouter.snapshot.params['id'];
    if (this.routerid !== null && this.routerid !== undefined) {
      this.isLoadingResults = true;
      this.service.findById(this.routerid)
        .subscribe(commercial => {
          if (commercial !== null && commercial.id !== undefined) {
            this.looadCustomer(commercial);
          } else {
            this.looadCustomer(new Product());
          }
        });
    }
  }

}
