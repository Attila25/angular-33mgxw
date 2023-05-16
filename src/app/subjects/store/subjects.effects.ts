import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  SubjectActionTypes,
  subjectCreatedAction,
  subjectsLoadedAction,
} from './subjects.actions';
import { SubjectsService } from '../subjects.service';
import { concatLatestFrom } from '@ngrx/effects';
import { selectNextSubjectId } from './subjects.selectors';

@Injectable()
export class SubjectEffects {
  loadAuthors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectActionTypes.subjectsRequested),
      mergeMap((action) => {
        return this.subjectsService.getSubjects().pipe(
          map((subjects) => subjectsLoadedAction({ subjects })),
          catchError(() => EMPTY)
        );
      })
    )
  );

  createSubject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectActionTypes.subjectCreate),
      concatLatestFrom((action) => this.store.select(selectNextSubjectId)),
      switchMap(([action, id]) => {
        console.log(action, id);
        return this.subjectsService.createSubject(action).pipe(
          map((item: any) => {
            return subjectCreatedAction({
              subject: {
                id: action.id,
                neptun: action.neptun,
                name: action.name,
                email: action.email,
                position: action.position,
                subjectId: action.subjectId,
                subjects: [],
                deleted: false,
              },
            });
          }),
          catchError(() => EMPTY)
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private subjectsService: SubjectsService,
    private store: Store
  ) {}
}
