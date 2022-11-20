import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { Book } from '../book/book.model';
import * as fromApp from '../../store/app.reducer';
import * as BookActions from '../book/store/book-list.action'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 
  books: Book[] = [];

  booksLoaded = false;

  booksSubcriptions: Subscription= new Subscription();
  // @ts-ignore
  public books$: Observable<{ books: Book[]; }>


  constructor(private store: Store<fromApp.AppState> ,private bookService: BookService, private router: Router) {


  }

  ngOnInit(): void {
   this.books$ = this.store.select('bookList');
   this.booksSubcriptions=this.books$.subscribe((e: { books: Book[]; })=>{
      this.books=e.books;
      this.booksLoaded=true;
      
    })

    this.store.dispatch(
      new BookActions.SetBooks(this.books)
    )

  }


  ngOnDestroy(): void {
      
    this.booksSubcriptions.unsubscribe();
  }

  onClick() {
    // @ts-ignore
    this.router.navigate(['/books/new']);
  }
}
