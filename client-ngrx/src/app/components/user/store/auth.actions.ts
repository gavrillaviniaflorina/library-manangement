import { Action } from "@ngrx/store";

export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATE_SUCCESS = '[Auth] Login';
export const AUTHENTICATE_FAIL = '[Auth] Login Fail';
export const SIGNUP_START = '[Auth] Signup Start';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const LOGOUT = '[Auth] Logout';


export class AuthentificateSuccess implements Action{
    readonly type= AUTHENTICATE_SUCCESS;

    constructor(
        public payload: {
            email: string;
            userId: number;
            token: string;
          }
    ){}
}

export class LoginStart implements Action{
    readonly type = LOGIN_START;

    constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticateFail implements Action {
    readonly type = AUTHENTICATE_FAIL;
  
    constructor(public payload: string) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class SignupStart implements Action {
    readonly type = SIGNUP_START;
  
    constructor(public payload: { email: string; password: string }) {}
  }
  
  export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
  }
  
  export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
  }

export type AuthActions = AuthentificateSuccess | LoginStart | AuthenticateFail | Logout | SignupStart | ClearError | AutoLogin


