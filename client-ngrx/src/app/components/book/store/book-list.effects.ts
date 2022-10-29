import { Injectable } from "@angular/core";
import { Actions, createEffect } from "@ngrx/effects";
import { catchError, EMPTY, map, switchMap, take} from "rxjs";
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
            take(1),
            switchMap(() => this.bookService.getBooks().pipe(
                map(response => new BooksActions.SetBooks(response.books)),
                catchError(error => {
                    console.error(error);
                    return EMPTY;}
                ),
        )
    )))
}


