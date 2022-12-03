import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/book';
import { BookService } from 'src/app/services/book.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css'],
})
export class NewBookComponent implements OnInit {
  constructor(private notificationService:NotificationsService, private bookService:BookService ,private router:Router) {}
  //@ts-ignore
  bookForm: FormGroup;

 

   book:Book={
    title:"",
    author:"",
    gen:"",
    year:0
   };

  // @ViewChild('ceva') altceva;

  ngOnInit(): void {

    this.initForm();

   
  
  }


  private initForm():void{

     this.bookForm= new FormGroup({

       'title':new FormControl("",Validators.required),
       'author':new FormControl("",Validators.required),
       'gen':new FormControl("",Validators.required),
       'year':new FormControl("",[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])

     })
  }

  public onClick(event:Event){

   
    if(this.bookForm.valid==true){

      
      this.book.title=this.bookForm.value['title'];
      this.book.author=this.bookForm.value['author'];
      this.book.gen=this.bookForm.value['gen'];
      this.book.year=this.bookForm.value['year'];




      this.bookService.addBook(this.book).subscribe(response=>{
        console.log(response);
      });

    }else{

      this.validare();
    }
  }

  public validare(){

     for(let e in this.bookForm.value){

       if(this.bookForm.value[e]==""){

         this.notificationService.onError(e+" is required"); 
       }
     }
  }






public OnCancel(event:Event){

  this.router.navigate(['/books']);
}
}
