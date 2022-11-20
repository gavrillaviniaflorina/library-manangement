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
import { Register } from '../../login/register.model';

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


    authSignUp$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(AuthAction.SIGNUP_START),
            switchMap((authData: AuthAction.SignupStart)=>{
                return this.authService.signUp(new Register(authData.payload.email, authData.payload.password))
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
        )
    })


    autoLogin$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(AuthAction.AUTO_LOGIN),
            switchMap(() => {
                const userData: {
                    id: number;
                    email: string;
                    token:string   
                } = JSON.parse(localStorage.getItem('userDate')!);
                console.log(userData.email)
                if(!userData){
                    return {type: 'DUMMY'}
                }
                const loadUser = new User(
                    userData.id,
                    userData.email,
                    userData.token
                )

                if(loadUser.token){
                    return new AuthAction.AuthentificateSuccess({
                        email:loadUser.email,
                        userId:loadUser.id,
                        token:loadUser.token
                    })
                }
                return {type: 'DUMMY'}
            })           
        )
    })
}