import { createAction, props } from '@ngrx/store';
import { SemesterModel } from './semesters.model';

export enum SemesterActionTypes {
  semestersRequested = '[Semesters] Semesters Requested',
  semestersLoaded = '[Semesters] Semesters Loaded',
  semesterCreate = '[Semesters] Semester Create',
  semesterCreated = '[Semesters] Semester Created',
}

export const semestersRequestedAction = createAction(
  SemesterActionTypes.semestersRequested
);
export const semestersLoadedAction = createAction(
  SemesterActionTypes.semestersLoaded,
  props<{ semesters: SemesterModel[] }>()
);
export const semesterCreateAction = createAction(
  SemesterActionTypes.semesterCreate,
  props<{ semester: SemesterModel }>()
);
export const semesterCreatedAction = createAction(
  SemesterActionTypes.semesterCreated,
  props<{ semester: SemesterModel }>()
);
