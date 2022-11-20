import * as AuthAction from './auth.actions';
import { User } from "../user.model";
import { identifierName } from '@angular/compiler';
import { catchError, map, of, switchMap, take, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from '../../login/login.model';

const handleAuthentication =(
    userId: number,
    email: string,
    token: string  
) =>{

const user = new User(userId, email, token);
localStorage.setItem('userData', JSON.stringify(user));
return new AuthAction.AuthentificateSuccess({
    userId:userId,
    email:email,
    token:token,
    redirect:true
});
};

const handleError = (errorRes: any) => {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return of(new AuthAction.AuthenticateFail(errorMessage));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return of(new AuthAction.AuthenticateFail(errorMessage));
  };

  @Injectable()
  export class AuthEffects {

    constructor(private actions$: Actions,
         private http:HttpClient, 
         private router:Router,
         private authService: AuthService
         ){}


    authLogin$ = createEffect(()=> {
        return this.actions$.pipe(
            ofType(AuthAction.LOGIN_START),
            switchMap((authData: AuthAction.LoginStart) => {
                return this.authService.login(new Login(authData.payload.email, authData.payload.password))
                    .pipe(
                        map(resData => {
                            return handleAuthentication(
                                resData.userId,
                                resData.email,
                                resData.token
                            );
                        }),
                        catchError(errorRes => {
                            return handleError(errorRes);
                        })
                    );
            })
        );
    })
}