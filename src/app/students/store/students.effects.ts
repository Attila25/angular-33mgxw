import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  StudentActionTypes,
  studentCreatedAction,
  studentsLoadedAction,
} from './students.actions';
import { StudentsService } from '../students.service';
import { concatLatestFrom } from '@ngrx/effects';
import { selectNextStudentId } from './students.selectors';

@Injectable()
export class StudentEffects {
  loadAuthors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActionTypes.studentsRequested),
      mergeMap((action) => {
        return this.studentsService.getStudents().pipe(
          map((students) => studentsLoadedAction({ students })),
          catchError(() => EMPTY)
        );
      })
    )
  );

  createStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActionTypes.studentCreate),
      concatLatestFrom((action) => this.store.select(selectNextStudentId)),
      switchMap(([action, id]) => {
        console.log(action, id);
        return this.studentsService.createStudent(action).pipe(
          map((item: any) => {
            return studentCreatedAction({
              student: {
                id: action.id,
                neptun: action.neptun,
                name: action.name,
                email: action.email,
                course: action.course,
                subjectId: action.subjectId,
                subjects_s: [],
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
    private studentsService: StudentsService,
    private store: Store
  ) {}
}
