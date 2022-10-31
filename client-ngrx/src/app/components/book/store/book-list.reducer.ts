import { Action } from 'rxjs/internal/scheduler/Action';
import { Book } from '../book.model';
import * as Actions from './book-list.action';

export interface State {
  books: Book[];
}

const initialState: State = {
  books: [],
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
        books: action.payload,
      };
    case Actions.ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload],
      };
    case Actions.UPDATE_BOOK:
      return {
        ...state,
        books: [...state.books.filter(e=>e.id!= action.payload.id), action.payload],
      };

    default:
      return state;
  }
}
