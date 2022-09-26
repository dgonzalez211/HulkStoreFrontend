import { Injectable } from '@angular/core';
import { UtilitiesService } from '../utilities.service';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private utilitiesService: UtilitiesService
  ) { }

  authenticate(username: string, password: string): Observable<any> {
    let url = `${this.utilitiesService.serviceUrl()}/auth/lg`;

    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    let body = new URLSearchParams();
    body.set('userName', username);
    body.set('password', password);

    return this.http.post<any>(url, body.toString(), httpOptions).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.utilitiesService.handleError(err);
      })
    );
  }

  secureRoute(route: String): Observable<boolean> {
    const url = `${this.utilitiesService.serviceUrl()}/secure${route}`;
    return this.http.get<boolean>(url).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.utilitiesService.handleError(err);
      })
    );
  }
}
