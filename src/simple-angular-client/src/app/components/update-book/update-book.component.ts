import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Book } from 'src/app/interfaces/book';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit ,OnDestroy {

  id:string='ceva';


  subsFind:Subscription | undefined;

  constructor(private notificationService:NotificationsService,private bookService:BookService, private route:ActivatedRoute,  private router: Router) { 

  }
  ngOnDestroy(): void {

    this.subsFind?.unsubscribe();

  }

 //@ts-ignore
  bookForm:FormGroup;

 //@ts-ignore
  title:string;

  book:Book=
  {
    title:"ex",
    author:"ex",
    gen:"ceva",
    year:1
  }

 

  ngOnInit(): void {
   

    this.initForm(this.book);
    this.route.params.subscribe(params=>{
   
      this.id=params['id'];

     this.subsFind= this.bookService.findBookById(+this.id).subscribe(response=>{

          this.initForm(response);
        
      })

    })
  }


  private initForm(book:Book):void{

    this.bookForm=new FormGroup({
      'title':new FormControl(book.title,Validators.required),
      'author':new FormControl(book.author,Validators.required),
      'gen':new FormControl(book.gen,Validators.required),
      'year':new FormControl(book.year,Validators.required)

    });

    this.title=book.title;
   // this.bookForm.controls["title"].disable();
  }

  public onClick(event:Event){
    

    if(this.bookForm.valid==true){

      this.bookService.updateBook(this.bookForm.value,+this.id).subscribe(response=>{

        this.success();
      });
    }else{
      this.validare();
    }
  
  }

  public OnCancel(event:Event){

    this.router.navigate(['/books']);
      
  }

  public OnDelete(){
   
    this.bookService.deleteBook(+this.id).subscribe(response=>{
    
     this.successDelete();

     this.router.navigate(['/books']);

    })
  }
  


  public validare(){


   for(let e in this.bookForm.value){
    if(this.bookForm.value[e]==""){
      this.notificationService.onError(e +" is required");
    }
   }
  }

  public success(){
    this.notificationService.onSuccess("The book was updated");
  }

  public successDelete(){
    this.notificationService.onSuccess("The book was deleted");
  
  }

}
