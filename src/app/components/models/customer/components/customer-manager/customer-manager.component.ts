import { Component, HostListener, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackAlertComponent } from 'src/app/components/snack-alert/snack-alert.component';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { Customer } from '../../customer';

@Component({
  selector: 'app-customer-manager',
  templateUrl: './customer-manager.component.html',
  styleUrls: ['./customer-manager.component.css']
})
export class CustomerManagerComponent implements OnInit {

  bread = {
    title: 'Customers',
    breads: [{
      active: false,
      title: 'Home',
      link: '/home'
    },
    {
      active: false,
      title: 'Customers',
      link: '/home/customer'
    }, {
      active: true,
      title: 'Manage customers',
      link: '/home/customer-manager'
    }]
  };
  isLoadingResults = false;
  routerid!: number;
  form!: UntypedFormGroup;
  customer!: Customer;
  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private _snackBar: MatSnackBar,
    private service: CustomerService,
    private activateRouter: ActivatedRoute,
  ) {
    this.customer = new Customer();
  }


  createForm() {
    this.form = this.formBuilder.group({
      name: [this.customer.name, [Validators.minLength(3), Validators.maxLength(90)]],
      lastName: [this.customer.lastName, [Validators.minLength(3), Validators.maxLength(90)]],
      surName: [this.customer.surName, [Validators.minLength(3), Validators.maxLength(90)]],
      provider: [this.customer.provider, [Validators.minLength(3), Validators.maxLength(90)]],
    });

    this.form.valueChanges.subscribe(data => {
      this.customer.name = data.name;
      this.customer.surName = data.surName;
      this.customer.lastName = data.lastName;
      this.customer.surName = data.surName;
      this.customer.provider = data.provider;
    });
  }


  validateOid(): boolean {
    return (this.customer.id !== 0 && this.customer.id !== undefined);
  }

  @HostListener('window:keydown.control.s')
  onSubmit() {
    if (this.form.valid) {
      this.isLoadingResults = true;

      this.service.save(this.customer).subscribe(

        {
          next: (rps) => {
            this.clear();
            this.isLoadingResults = false;
            this._snackBar.openFromComponent(SnackAlertComponent,
              {
                data: {
                  type: 'success',
                  message: 'Transaction complete',
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
            message: 'Form must be complete!'
          },
          panelClass: 'warning',
          duration: 3000
        });
    }
  }

  looadCustomer(customer: Customer) {
    this.isLoadingResults = false;
    this.customer = customer;
    this.bread.breads[this.bread.breads.length - 1].title = this.customer.name;
    this.createForm();
  }


  clear() {
    this.customer = new Customer();
    this.form.reset();
    this.bread.breads[this.bread.breads.length - 1].title = 'Manage customers';
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
            this.looadCustomer(new Customer());
          }
        });
    }
  }

}
