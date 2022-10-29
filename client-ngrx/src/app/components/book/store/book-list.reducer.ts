import { Book } from "../book.model";
import *  as Actions from './book-list.action';

export interface State {
    books : Book[];
}

const initialState: State = {
    books: []
};

export function bookListReducer(
    state: State = initialState,
    action: Actions.BookListAction
  ) {
    switch (action.type) {
      case Actions.SET_BOOKS:
        console.log(action.payload);
        return {
          ...state,
          books: action.payload
        };
    default:  
      console.log("ceva tare "+action.type);
      return state; }
  }


