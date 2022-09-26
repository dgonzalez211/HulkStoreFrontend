import { Component, HostListener, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackAlertComponent } from 'src/app/components/snack-alert/snack-alert.component';
import { UserService } from 'src/app/services/user/user.service';
import { User } from '../../user';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {

  bread = {
    title: 'Users',
    breads: [{
      active: false,
      title: 'Home',
      link: '/home'
    },
    {
      active: false,
      title: 'Users',
      link: '/home/user'
    }, {
      active: true,
      title: 'Manage users',
      link: '/home/user-manager'
    }]
  };
  isLoadingResults = false;
  routerid!: number;
  form!: UntypedFormGroup;
  user!: User;
  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private _snackBar: MatSnackBar,
    private service: UserService,
    private activateRouter: ActivatedRoute,
  ) {
    this.user = new User();
  }


  createForm() {
    this.form = this.formBuilder.group({
      name: [this.user.name, [Validators.minLength(3), Validators.maxLength(90)]],
      userName: [this.user.userName, [Validators.minLength(3), Validators.maxLength(90)]],
      lastName: [this.user.lastName, [Validators.minLength(3), Validators.maxLength(90)]],
      surName: [this.user.surName, [Validators.minLength(3), Validators.maxLength(90)]],
      password: [this.user.password, [Validators.minLength(3), Validators.maxLength(90)]],
    });

    this.form.valueChanges.subscribe(data => {
      this.user.name = data.name;
      this.user.name = data.userName;
      this.user.surName = data.surName;
      this.user.lastName = data.lastName;
      this.user.surName = data.surName;
      this.user.password = data.provider;
    });
  }

  validateOid(): boolean {
    return (this.user.id !== 0 && this.user.id !== undefined);
  }

  @HostListener('window:keydown.control.s')
  onSubmit() {
    if (this.form.valid) {
      this.isLoadingResults = true;

      this.service.save(this.user).subscribe(

        {
          next: (rps) => {
            this.clear();
            this.isLoadingResults = false;
            this._snackBar.openFromComponent(SnackAlertComponent,
              {
                data: {
                  type: 'success',
                  message: 'Successfull transaction',
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
            message: 'Please complete the whole form'
          },
          panelClass: 'warning',
          duration: 3000
        });
    }
  }

  looadCustomer(user: User) {
    this.isLoadingResults = false;
    this.user = user;
    this.bread.breads[this.bread.breads.length - 1].title = this.user.name;
    this.createForm();
  }


  clear() {
    this.user = new User();
    this.form.reset();
    this.bread.breads[this.bread.breads.length - 1].title = 'Manage users';
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
            this.looadCustomer(new User());
          }
        });
    }
  }

}
