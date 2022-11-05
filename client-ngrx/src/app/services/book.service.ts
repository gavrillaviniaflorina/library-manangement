import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../components/book/book.model';
import { CustomHttpResponse } from '../interfaces/custom-http-response';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private server = environment.apiUrl+"/api/v1";

  constructor(private http:HttpClient) { }

  getBooks():Observable<Book[]>{
    return this.http.get<Book[]>(this.server+"/books");
  }

  addBook(book:Book):Observable<Book>{
    return this.http.post<Book>(this.server+"/books/add",book);
  }

  updateBook(book: Book ,id:number):Observable<Book> {
    return  this.http.put<Book>
      (`${this.server}/books/${id}`, book).pipe(catchError(this.handleError));
  }

  getBook(bookId:number):Observable<Book>{
    return this.http.get<Book>(`${this.server}/books/findBook/${bookId}`).pipe(
      catchError(this.handleError)
    )
    ;
  }

  deleteBook(id:number):Observable<Book>{
   return this.http.delete<Book>(`${this.server}/books/delete/${id}`).pipe(catchError(this.handleError));
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
