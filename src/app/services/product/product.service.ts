import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from 'src/app/components/models/product/product';
import { UtilitiesService } from '../utilities.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

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

  save(product: Product): Observable<Product> {

    const url = `${this.utilitiesService.serviceUrl()}/product/save`;
    return this.http.post<Product>(url, product, this.httpOptions).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.utilitiesService.handleError(err);
      })
    );
  }

  findById(id: number): Observable<Product> {
    const url = `${this.utilitiesService.serviceUrl()}/product/findById?id=${id}`;
    return this.http.get<Product>(url, this.httpOptions).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.utilitiesService.handleError(err);
      })
    );
  }


  typeHeadSearchPage(query: string, page: number, size: number, order: String, sort: String): Observable<any> {
    const url = `${this.utilitiesService.serviceUrl()}/product/typeHeadSearchPage?page=${page}&size=${size}&query=${query}&order=${order}&sort=${sort}`;
    return this.http.get<any>(url).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.utilitiesService.handleError(err);
      })
    );
  }

  typeHeadSearch(query: string): Observable<Array<any>> {
    const url = `${this.utilitiesService.serviceUrl()}/product/typeHeadSearch/?query=${query}`;
    return this.http.get<Array<DocumentType>>(url).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.utilitiesService.handleError(err);
      })
    );
  }
}
