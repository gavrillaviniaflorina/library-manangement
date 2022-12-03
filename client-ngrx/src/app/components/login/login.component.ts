import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
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

  ngOnInit(): void {
    this.storeSub=this.store.select('user').subscribe((data)=>{
      if(data.loggedIn==true){
        this.router.navigate(['/books']);
       }
    });

    this.store.dispatch(
      new AuthActions.AutoLogin()
    )
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }
  //@ts-ignore
  loginForm:FormGroup;

 onLogin(form: NgForm){
  
  const email= form.value.email;
  const password = form.value.password;

  this.store.dispatch(
    new AuthActions.LoginStart({email:email, password:password})
  )

  form.reset();
 }


 onRegister(form: NgForm){
  const email= form.value.email;
  const password = form.value.password;

  this.store.dispatch(
    new AuthActions.SignupStart({email:email, password:password})
  )

  form.reset();
 }

 AutoLogin(){
  this.store.dispatch(
    new AuthActions.AutoLogin()
  )
}

}
