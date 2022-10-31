import { Component, Input, OnInit } from '@angular/core';
import { Book } from './book.model';

@Component({
  selector: '.book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() book: Book=new Book(0,"","","",0);
  constructor() { }

  ngOnInit(): void {
  }

}
