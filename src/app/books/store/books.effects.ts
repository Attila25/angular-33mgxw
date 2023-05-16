import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { BooksService } from '../books.service';
import { BookActionTypes, booksLoadedAction } from './books.actions';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/effects';
import { selectNextBookId } from '../store/books.selectors';
import { BookModel } from './books.model';

@Injectable()
export class BookEffects {

  loadAuthors$ = createEffect(() => this.actions$.pipe(
    ofType(BookActionTypes.booksRequested),
    mergeMap((action) => {
      return this.booksService.getBooks()
      .pipe(
        map(books => (booksLoadedAction({books}))),
        catchError(() => EMPTY)
      )})
    )
  );

  createBook$ = createEffect(() => this.actions$.pipe(
    ofType(BookActionTypes.bookCreate),
    concatLatestFrom(action => this.store.select(selectNextBookId)),
    switchMap(([action, id]) => {
      console.log(action, id);
      return this.booksService.createBook(action).pipe(
        map((item: any) => {
            return bookCreatedAction({book: {
              id,
              title: action.title,
              publishYear: action.publishYear,
              pages: action.pages,
              isbn: action.isbn,
              authorId: action.authorId,
              authorName: '',
              deleted: false
            }});
        }),
        catchError(() => EMPTY)
      )
    })
  ))

  constructor(
    private actions$: Actions,
    private booksService: BooksService,
    private store: Store
  ) {}
}