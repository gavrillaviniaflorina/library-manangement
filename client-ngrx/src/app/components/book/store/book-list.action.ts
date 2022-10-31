import { Action } from "@ngrx/store";
import { Book } from "../book.model";


export const SET_BOOKS = '[Books] Set Books';
export const ADD_BOOK = 'ADD BOOK';
export const UPDATE_BOOK ='UPDATE BOOK';
export class SetBooks implements Action{
    readonly type = SET_BOOKS;

    constructor( public payload: Book[]){
        console.log(this.payload);
    }
}

export class AddBook implements Action {
    readonly type= ADD_BOOK;
    
    constructor(public payload: Book){

    }
}

export class UpdateBook implements Action {
    readonly type= UPDATE_BOOK;
    constructor(public payload: Book){}
    
}


export type BookListAction = SetBooks|AddBook|UpdateBook;