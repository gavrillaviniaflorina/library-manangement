import { InitialState } from "@ngrx/store/src/models";
import { User } from "../user.model";
import * as AuthActions from '../store/auth.actions'
import { AUTHENTICATE_SUCCESS } from "../store/auth.actions";
import { Action } from "rxjs/internal/scheduler/Action";
import { act } from "@ngrx/effects";
export interface State {
    user: User;
    authError: string;
    loggedIn:boolean;
}

const initialState : State = {
    user: new User( 0, "", ""),
    authError: "",
    loggedIn:false

};

export function authReducer(
    state = initialState,
    action: AuthActions.AuthActions
){
    switch(action.type){
        case AuthActions.AUTHENTICATE_SUCCESS:
            
            const user = new User(
                action.payload.userId,
                action.payload.email,
                action.payload.token,
            );
            return {
                ...state,
                authError:"",
                user: user,
                loggedIn: true
              };

        case AuthActions.AUTHENTICATE_FAIL:

           return {
                ...state,
                authError:  action.payload,
                user: null,
                loggedIn: false
              };
        
        case AuthActions.LOGOUT:
           
            return {
                ...state,
                authError:"",
                user: null,
                loggedIn: false
            }

        default:
            return state;
    }
}