import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {SnackAlertComponent} from '../components/snack-alert/snack-alert.component';
import {environment} from 'src/environments/environment';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {


  constructor(
    private router: Router,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
  ) {
  }

  serviceUrl(): any {
    return environment.APIEndpoint;
  }

  handleError(e: any) {
    console.log(e.status);
    switch (e.status) {
      case 0:
        this._snackBar.openFromComponent(
          SnackAlertComponent,
          {
            data: {
              type: 'error',
              message: e.error.error_description
            },
            panelClass: 'error',
            duration: 3000
          });
        break;
      case 400:
        this._snackBar.openFromComponent(
          SnackAlertComponent,
          {
            data: {
              type: 'error',
              message: e.error.error_description
            },
            panelClass: 'error',
            duration: 3000
          });
        break;

      case 403:
        this._snackBar.openFromComponent(
          SnackAlertComponent,
          {
            data: {
              type: 'error',
              message: e.error.error_description
            },
            panelClass: 'error',
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        this.router.navigate(['/log-in']);
        break;
      case 401:
        this._snackBar.openFromComponent(
          SnackAlertComponent,
          {
            data: {
              type: 'error',
              message: e.error.error_description,
              duration: 3000
            },
            panelClass: 'error'
          });
        if (e.error.error == 'invalid_token') {
          this.router.navigate(['/log-in']);
        }
        break;
      default:

        this._snackBar.openFromComponent(
          SnackAlertComponent,
          {
            data: {
              type: 'error',
              message: 'Something went wrong'
            },
            panelClass: 'error',
            duration: 3000
          });
        break;
    }
    return throwError(() => new Error(e));
  }


}
