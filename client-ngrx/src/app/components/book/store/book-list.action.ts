import { Action } from "@ngrx/store";
import { Book } from "../book.model";


export const SET_BOOKS = '[Books] Set Books';

export class SetBooks implements Action{
    readonly type = SET_BOOKS;

    constructor( public payload: Book[]){
        console.log(this.payload);
    }
}

export type BookListAction = SetBooks;