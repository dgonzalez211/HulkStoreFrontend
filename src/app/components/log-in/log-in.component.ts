import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { SnackAlertComponent } from '../snack-alert/snack-alert.component';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  hide = true;
  isLoadingResults = false;
  formLogin: UntypedFormGroup;
  user = {
    'userName': '',
    'password': ''
  }

  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private _snackBar: MatSnackBar,
    private authenticationService:AuthenticationService
  ) {

    this.formLogin = formBuilder.group({
      userName: [this.user.userName, [Validators.required]],
      password: [this.user.password, [Validators.required]],
    });

  }

  ngOnInit(): void {
    sessionStorage.clear();
    this.formLogin.valueChanges.subscribe(data => {
      this.user.userName = data.userName;
      this.user.password = data.password;
    });
  }

  login() {
    if (this.formLogin.valid) {
      this.isLoadingResults = true;
      this.authenticationService.authenticate(this.user.userName, this.user.password)
        .subscribe({
          next: (token) => {
            if (token) {
              sessionStorage.setItem('tk',token.access_token);
              this.router.navigate(['/home/product']);
            }
          }, error: (e) => {
            this._snackBar.openFromComponent(
              SnackAlertComponent,
              {
                data: {
                  type: 'error',
                  message: 'Combination of user/password is wrong!'
                },
                panelClass: 'error',
                duration: 3000
              });
            this.isLoadingResults = false;
          }, complete: () => {
            this.isLoadingResults = false;
          }
        });
    }
  }



}
