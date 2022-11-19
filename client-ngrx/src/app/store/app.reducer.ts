import { ActionReducerMap } from "@ngrx/store";
import * as fromBookList  from  "../components/book/store/book-list.reducer"
import * as fromAuthentificate from "../components/user/store/auth.reducer"
export interface AppState {
    bookList: fromBookList.State;
    user: fromAuthentificate.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    // @ts-ignore   
    bookList: fromBookList.bookListReducer,
   // @ts-ignore
    user:fromAuthentificate.authReducer
  };