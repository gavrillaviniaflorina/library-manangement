import * as AuthAction from './auth.actions';
import { User } from "../user.model";
import { catchError, map, of, switchMap, take, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

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
            map((e) => {
                const userData: {
                    id: number;
                    email: string;
                    token:string   
                } = JSON.parse(localStorage.getItem('userData')!);
               
                if(!userData){
                    return new AuthAction.AuthenticateFail("")
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