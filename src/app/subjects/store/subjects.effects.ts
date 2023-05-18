import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  SubjectActionTypes,
  subjectCreatedAction,
  subjectsLoadedAction,
  subjectLoadedAction,
  subjectUpdatedAction,
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

  loadSubject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectActionTypes.subjectRequested),
      switchMap((action) =>
        this.subjectsService.getSubject(action.subjectId).pipe(
          map((subject) => subjectLoadedAction({ subject })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  updateSubject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectActionTypes.subjectUpdate),
      switchMap((action) => {
        return this.subjectsService.updateSubject(action).pipe(
          map((item: any) => {
            return subjectUpdatedAction({
              subject: {
                id: action.id,
                neptun: action.neptun,
                name: action.name,
                credit: action.credit,
                department: action.department,
                semesterId: action.semesterId,
                semesters_s: action.semesters_s,
                deleted: action.deleted,
              },
            });
          }),
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
                credit: action.credit,
                department: action.department,
                semesterId: action.semesterId,
                semesters_s: action.semesters_s,
                deleted: action.deleted,
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
