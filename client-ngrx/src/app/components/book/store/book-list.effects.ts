import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, map, switchMap, take, tap} from "rxjs";
import { BookService } from "src/app/services/book.service";
import * as BooksActions from './book-list.action';
@Injectable()
export class BooksEffects {

    constructor(
        private actions$: Actions,
        private bookService: BookService,
    ) { }

    loadBooks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BooksActions.SET_BOOKS),
            take(1),
           
            switchMap(() => this.bookService.getBooks().pipe(
                map(response => new BooksActions.SetBooks(response)),
                catchError(error => {
                    console.error(error);
                    return EMPTY;}
                ),
        )
    )))
}


