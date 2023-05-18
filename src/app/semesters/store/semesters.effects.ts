import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  SemesterActionTypes,
  semesterCreatedAction,
  semesterLoadedAction,
  semestersLoadedAction,
  semesterUpdatedAction,
} from './semesters.actions';
import { SemestersService } from '../semesters.service';
import { concatLatestFrom } from '@ngrx/effects';
import { selectNextSemesterId } from './semesters.selectors';

@Injectable()
export class SemesterEffects {
  loadAuthors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SemesterActionTypes.semestersRequested),
      mergeMap((action) => {
        return this.semestersService.getSemesters().pipe(
          map((semesters) => semestersLoadedAction({ semesters })),
          catchError(() => EMPTY)
        );
      })
    )
  );

  loadSemester$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SemesterActionTypes.semesterRequested),
      switchMap((action) =>
        this.semestersService.getSemester(action.semesterId).pipe(
          map((semester) => semesterLoadedAction({ semester })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  updateSemester$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SemesterActionTypes.semesterUpdate),
      switchMap((action) => {
        return this.semestersService.updateSemester(action).pipe(
          map((item: any) => {
            return semesterUpdatedAction({
              semester: {
                id,
                name: action.name,
                start_date: action.start_date,
                end_date: action.end_date,
                deleted: false,
              },
            });
          }),
          catchError(() => EMPTY)
        );
      })
    )
  );

  createSemester$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SemesterActionTypes.semesterCreate),
      concatLatestFrom((action) => this.store.select(selectNextSemesterId)),
      switchMap(([action, id]) => {
        console.log(action, id);
        return this.semestersService.createSemester(action).pipe(
          map((item: any) => {
            return semesterCreatedAction({
              semester: {
                id,
                name: action.name,
                start_date: action.start_date,
                end_date: action.end_date,
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
    private semestersService: SemestersService,
    private store: Store
  ) {}
}
