import { Component, OnInit } from '@angular/core';
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
export class BookDetailsComponent implements OnInit {
  //@ts-ignore
  bookForm: FormGroup;
  id:number=0;
  book: Book | undefined;
  subscription: Subscription | undefined;

  constructor(private store: Store<fromApp.AppState>,private bookService:BookService, private router:Router,private route:ActivatedRoute, private notificationService:NotificationService) {

   }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params )=>{
      this.initForm();
        this.id=+params['id'];
      })
  }


  private initForm(): void {

    let title = "";
    let author = "";
    let gen = "";
    let year = 0;



    this.bookForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'author': new FormControl(author, Validators.required),
      'gen': new FormControl(gen, Validators.required),
      'year': new FormControl(year, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    })

  }

  onCancel(): void {
    this.router.navigate(['/']);
  }


  validate(): void {
    for(let e in this.bookForm.value){
        if(this.bookForm.value[e] == null) {
          this.notificationService.onError(e + " is required ");
        }
    }

    if (this.bookForm.value['year'] != null && this.bookForm.value['year'].match(/^[1-9]+[0-9]*$/) == null) {
      this.notificationService.onError("year must be a number")
    }
  }

  onUpdate(): void {
    if(this.bookForm.valid ==true) {
      this.bookService.updateBook(this.bookForm.value, this.id).subscribe({
        next:(response:Book) =>{ this.notificationService.onSuccess('Done');
        this.store.dispatch(new BooksActions.UpdateBook(this.bookForm.value));
      },
        error: (error:any) => this.notificationService.onError('Error')
    })
    this.router.navigate(['/']);
    } else {
      this.validate();
    }
  }


}
