import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public books: Book[] = [];
  public x: number = 0;
  constructor(private bookService: BookService, private router: Router) {}
  ngOnInit(): void {
    this.bookService.booksChanged.subscribe((response) => {
      this.books = [...response];
    });
  }

  public goToNewBook(): void {
   
    this.router.navigate(['/books/new']);
  }


}
