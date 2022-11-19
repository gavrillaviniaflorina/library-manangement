import { InitialState } from "@ngrx/store/src/models";
import { User } from "../user.model";
import * as AuthActions from '../store/auth.actions'
import { AUTHENTICATE_SUCCESS } from "../store/auth.actions";
import { Action } from "rxjs/internal/scheduler/Action";
export interface State {
    user: User;
    authError: string;
    loading:boolean;
}

const initialState : State = {
    user: new User( 0, "", ""),
    authError: "",
    loading:false
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
                authError: null,
                user: user,
                loading: false
              };
            
        default:
            return state;
    }
}