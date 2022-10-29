import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../components/book/book.model';
import { CustomHttpResponse } from '../interfaces/custom-http-response';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private server = environment.apiUrl+"/api/v1";

  constructor(private http:HttpClient) { }

  getBooks():Observable<CustomHttpResponse>{
    console.log('aici');
    return this.http.get<CustomHttpResponse>(this.server+"/books");
  }
 
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = `A client error occurred - ${error.error.message}`;
    } else {
      if (error.error.reason) {
        errorMessage = `${error.error.reason} - Error code ${error.status}`;
      } else {
        errorMessage = `An error occurred - Error code ${error.status}`;
      }
    }
    return throwError(errorMessage);
  }



}
