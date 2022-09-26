import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UtilitiesService } from '../utilities.service';
import { User } from 'src/app/components/models/user/user';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private utilitiesService: UtilitiesService
  ) { }

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      }
    )
  };

  save(user: User): Observable<User> {

    const url = `${this.utilitiesService.serviceUrl()}/user/save`;
    return this.http.post<User>(url, user, this.httpOptions).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.utilitiesService.handleError(err);
      })
    );
  }

  findById(id: number): Observable<User> {
    const url = `${this.utilitiesService.serviceUrl()}/user/findById?id=${id}`;
    return this.http.get<User>(url, this.httpOptions).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.utilitiesService.handleError(err);
      })
    );
  }


  typeHeadSearchPage(query: string, page: number, size: number, order: String, sort: String): Observable<any> {
    const url = `${this.utilitiesService.serviceUrl()}/user/typeHeadSearchPage?page=${page}&size=${size}&query=${query}&order=${order}&sort=${sort}`;
    return this.http.get<any>(url).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.utilitiesService.handleError(err);
      })
    );
  }
}
