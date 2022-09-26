import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UtilitiesService } from '../utilities.service';
import { Customer } from 'src/app/components/models/customer/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

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

  save(customer: Customer): Observable<Customer> {

    const url = `${this.utilitiesService.serviceUrl()}/customer/save`;
    return this.http.post<Customer>(url, customer, this.httpOptions).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.utilitiesService.handleError(err);
      })
    );
  }

  findById(id: number): Observable<Customer> {
    const url = `${this.utilitiesService.serviceUrl()}/customer/findById?id=${id}`;
    return this.http.get<Customer>(url, this.httpOptions).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.utilitiesService.handleError(err);
      })
    );
  }


  typeHeadSearchPage(query: string, page: number, size: number, order: String, sort: String): Observable<any> {
    const url = `${this.utilitiesService.serviceUrl()}/customer/typeHeadSearchPage?page=${page}&size=${size}&query=${query}&order=${order}&sort=${sort}`;
    return this.http.get<any>(url).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.utilitiesService.handleError(err);
      })
    );
  }

  typeHeadSearch(query: string): Observable<Array<any>> {
    const url = `${this.utilitiesService.serviceUrl()}/customer/typeHeadSearch/?query=${query}`;
    return this.http.get<Array<DocumentType>>(url).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.utilitiesService.handleError(err);
      })
    );
  }
}
