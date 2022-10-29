import { ActionReducerMap } from "@ngrx/store";
import * as fromBookList  from  "../components/book/store/book-list.reducer"

export interface AppState {
    bookList: fromBookList.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    // @ts-ignore
    bookList: fromBookList.bookListReducer
  };