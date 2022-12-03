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
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {

   // @ts-ignore
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

  onCancel(): void {
    this.router.navigate(['/']);
  }

  onCreate(): void {
    if(this.bookForm.valid == true) {

      this.bookService.addBook(this.bookForm.value).subscribe({
        next: (response:Book) => { 
          console.log(response);
              this.notificationService.onSuccess('Succes');
              this.store.dispatch(new BooksActions.AddBook(response));
              
              }, 
        error: (error: any)=> this.notificationService.onError(error)
            })    
            
      this.router.navigate(['/']);
    } else {
      this.validate();
    }   
  }

  private initForm(): void {

    this.bookForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'author': new FormControl(null, Validators.required),
      'gen': new FormControl(null, Validators.required),
      'year': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
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
