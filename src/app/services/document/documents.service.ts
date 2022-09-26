import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UtilitiesService } from '../utilities.service';
import { CommercialDocument } from 'src/app/components/models/generate-document/commercialDocument';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

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

  save(document: CommercialDocument): Observable<CommercialDocument> {
    console.log(document);
    const url = `${this.utilitiesService.serviceUrl()}/document/save`;
    return this.http.post<CommercialDocument>(url, document, this.httpOptions).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.utilitiesService.handleError(err);
      })
    );
  }

  typeHeadSearchTypeDocument(query: string): Observable<Array<any>> {
    const url = `${this.utilitiesService.serviceUrl()}/document/typeHeadSearch/?query=${query}`;
    return this.http.get<Array<DocumentType>>(url).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.utilitiesService.handleError(err);
      })
    );
  }

  typeHeadSearchPage(query: string, page: number, size: number, order: String, sort: String): Observable<any> {
    const url = `${this.utilitiesService.serviceUrl()}/document/typeHeadSearchPage?page=${page}&size=${size}&query=${query}&order=${order}&sort=${sort}`;
    return this.http.get<any>(url).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.utilitiesService.handleError(err);
      })
    );
  }

}
