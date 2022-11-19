import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from "../user/store/auth.actions"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit, OnDestroy {

  constructor( private store: Store<fromApp.AppState>, private authentificationService:AuthService, private router:Router) {  
  }

  private storeSub: Subscription=new Subscription();
  
  private error: string ="";

  ngOnInit(): void {
    this.storeSub=this.store.select('user').subscribe((data)=>{
      this.error=data.authError;
      if(data.authError==''){
        this.router.navigate(['/books']);
       }
    });
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }
  //@ts-ignore
  loginForm:FormGroup;

 onSubmit(form: NgForm){
  
  const email= form.value.email;
  const password = form.value.password;


  this.store.dispatch(
    new AuthActions.LoginStart({email:email, password:password})
  )

  form.reset();
 }

}
