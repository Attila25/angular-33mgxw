import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  StudentActionTypes,
  studentCreatedAction,
  studentLoadedAction,
  studentsLoadedAction,
  studentUpdatedAction,
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

  loadStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActionTypes.studentRequested),
      switchMap((action) =>
        this.studentsService.getStudent(action.studentId).pipe(
          map((student) => studentLoadedAction({ student })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  updateStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActionTypes.studentUpdate),
      switchMap((action) => {
        return this.studentsService.updateStudent(action).pipe(
          map((item: any) => {
            return studentUpdatedAction({
              student: {
                id: action.id,
                neptun: action.neptun,
                name: action.name,
                email: action.email,
                course: action.course,
                subjectId: action.subjectId,
                subjects_s: action.subjects_s,
                deleted: false,
              },
            });
          }),
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
