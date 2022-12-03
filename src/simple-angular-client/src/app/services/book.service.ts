import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Book } from 'src/app/interfaces/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private api = environment.api + '/api/v1/books';


  public booksChanged = new BehaviorSubject<Book[]>([]);

  constructor(private http: HttpClient) {
    this.getBooks().subscribe((response) => {
      console.log('serviciu');
    });

  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.api ).pipe(
      tap((response: Book[]) => {
        this.booksChanged.next(response);
      },

      catchError(this.handleError)
    
      )
    );
  }

  addBook(book: Book): Observable<Book> {
    this.booksChanged.next([...this.booksChanged.value,book]);
    return this.http.post<Book>(this.api+"/add",book).pipe(catchError(this.handleError));
  
  }

  updateBook(book:Book, id:number):Observable<Book>{
    book.id=id;
    this.booksChanged.next([...this.booksChanged.value.filter(e=>e.id!=id),book]);
    return this.http.put<Book>(this.api+`/update/${id}`,book).pipe(catchError(this.handleError));
  }

  findBookById(id:number):Observable<Book>{
    return this.http.get<Book>(this.api+`/findBook/${id}`).pipe(catchError(this.handleError));
  }

  deleteBook(id:number):Observable<Book>{
     this.booksChanged.next([...this.booksChanged.value.filter(e=>e.id!=id)]);
    return this.http.delete<Book>(this.api+`/delete/${id}`).pipe(tap(console.log),catchError(this.handleError));
  }


  private handleError(error:HttpErrorResponse):Observable<never>{
      console.log(error);
      let errorMessage:string;

      if(error.error instanceof ErrorEvent){
        errorMessage=`A client error ocurred -${error.error.message}`;
      }else{

        if(error.error.reason){
          errorMessage=`${error.error.reason} - Error code ${error.status}`;
        }else{
          errorMessage=` An error ocurred -Error code ${error.status}`
        }
      }

      return throwError(errorMessage);

  }
  
}
