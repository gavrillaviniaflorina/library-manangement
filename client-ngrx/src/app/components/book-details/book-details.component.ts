import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Book } from '../book/book.model';
import * as fromApp from '../../store/app.reducer';
import * as BooksActions from '../book/store/book-list.action';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  //@ts-ignore
  bookForm: FormGroup;
  id:number=0;
   //@ts-ignore
  private book: Book;
  private routerSubscription: Subscription | undefined;
  private bookSubscription:Subscription | undefined;

  constructor(private store: Store<fromApp.AppState>,private bookService:BookService, private router:Router,private route:ActivatedRoute, private notificationService:NotificationService) {

   }
  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    this.bookSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.routerSubscription=this.route.params.subscribe((params:Params )=>{
        this.id=+params['id'];
        this.initForm();
      })
    this.getBook(this.id);
      
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  onUpdate(): void {
    if(this.bookForm.valid ==true) {
      this.bookService.updateBook(this.bookForm.value, this.id).subscribe({
        next:(response:Book) =>{ this.notificationService.onSuccess('Done');
        this.store.dispatch(new BooksActions.UpdateBook(this.bookForm.value));
      },
        error: (error:any) => this.notificationService.onError('Error'),
        complete:() => this.router.navigate(['/'])
    })
    } else {
      this.validate();
    }
  }

  onDelete(): void{
    this.bookService.deleteBook(this.id).subscribe(response=>{
      this.notificationService.onSuccess('Done');
      this.store.dispatch(new BooksActions.DeleteBook(this.book));
      this.router.navigate(['/']);
 
     })
  }

  private getBook(id:number): void{
    this.bookSubscription=this.bookService.getBook(this.id).subscribe({
      next:(response:Book)=>{
        // @ts-ignore
        this.book = response;
      },
      error:(error:any) => this.notificationService.onError(error.reason),
      complete:() => this.reloadForm()
    });
  }

  private initForm(): void {

    let title = "";
    let author = "";
    let gen = "";
    let year = 0;

    this.bookForm = new FormGroup({
      'id':new FormControl(0),
      'title': new FormControl(title, Validators.required),
      'author': new FormControl(author, Validators.required),
      'gen': new FormControl(gen, Validators.required),
      'year': new FormControl(year, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    })

  }

  private reloadForm(): void{
    this.bookForm = new FormGroup({
      'id': new FormControl(this.book.id),
      'title': new FormControl(this.book.title, Validators.required),
      'author': new FormControl(this.book.author, Validators.required),
      'gen': new FormControl(this.book.gen, Validators.required),
      'year': new FormControl(this.book.year, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    })
  }

  private validate(): void {
    for(let e in this.bookForm.value){
        if(this.bookForm.value[e] == null) {
          this.notificationService.onError(e + " is required ");
        }
    }

    if (this.bookForm.value['year'] != null && this.bookForm.value['year'].match(/^[1-9]+[0-9]*$/) == null) {
      this.notificationService.onError("year must be a number")
    }
  }

}
