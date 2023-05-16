import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { AuthorsService } from '../authors.service';
import { AuthorActionTypes, authorsLoadedAction, authorsRequestedAction, authorCreatedAction, authorLoadedAction, authorUpdatedAction } from './authors.actions';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/effects';
import { selectNextAuthorId } from '../store/authors.selectors';
import { AuthorModel } from './authors.model';

@Injectable()
export class AuthorEffects {

  loadAuthors$ = createEffect(() => this.actions$.pipe(
    ofType(AuthorActionTypes.authorsRequested),
    mergeMap(() => this.authorsService.getAuthors()
      .pipe(
        map(authors => (authorsLoadedAction({authors}))),
        catchError(() => EMPTY)
      ))
    )
  );
  loadAuthor$ = createEffect(() => this.actions$.pipe(
    ofType(AuthorActionTypes.authorRequested),
    switchMap((action) => this.authorsService.getAuthor(action.authorId)
      .pipe(
        map(author => (authorLoadedAction({author}))),
        catchError(() => EMPTY)
      ))
    )
  );

  createAuthor$ = createEffect(() => this.actions$.pipe(
    ofType(AuthorActionTypes.authorCreate),
    concatLatestFrom(action => this.store.select(selectNextAuthorId)),
    switchMap(([action, id]) => {
      return this.authorsService.createAuthor(action).pipe(
        map((item: any) => {
            return authorCreatedAction({author: {
              id,
              name: action.name,
              birthYear: action.birthYear,
              nationality: action.nationality,
              deleted: false
            }});
        }),
        catchError(() => EMPTY)
      )
    })
  ))

  updateAuthor$ = createEffect(() => this.actions$.pipe(
    ofType(AuthorActionTypes.authorUpdate),
    switchMap((action) => {
      return this.authorsService.updateAuthor(action).pipe(
        map((item: any) => {
            return authorUpdatedAction({author: {
              id: action.id,
              name: action.name,
              birthYear: action.birthYear,
              nationality: action.nationality,
              deleted: false
            }});
        }),
        catchError(() => EMPTY)
      )
    })
  ))

  deleteAuthor$ = createEffect(() => this.actions$.pipe(
    ofType(AuthorActionTypes.authorDelete),
    switchMap((action) => {
      return this.authorsService.deleteAuthor(action.author).pipe(
        map((item: any) => {
            return authorsRequestedAction();
        }),
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      )
    })
  ))

  constructor(
    private actions$: Actions,
    private authorsService: AuthorsService,
    private store: Store
  ) {}
}