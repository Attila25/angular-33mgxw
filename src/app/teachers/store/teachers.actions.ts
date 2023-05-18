import { createAction, props } from '@ngrx/store';
import { TeacherModel } from './teachers.model';

export enum TeacherActionTypes {
  teachersRequested = '[Teachers] Teachers Requested',
  teachersLoaded = '[Teachers] Teachers Loaded',
  teacherCreate = '[Teachers] Teacher Create',
  teacherCreated = '[Teachers] Teacher Created',
  teacherRequested = '[Teachers] Teacher Requested',
  teacherLoaded = '[Teachers] Teacher Loaded',
  teacherUpdate = '[Teachers] Teacher Update',
  teacherUpdated = '[Teachers] Teacher Updated',
}

export const teachersRequestedAction = createAction(
  TeacherActionTypes.teachersRequested
);
export const teachersLoadedAction = createAction(
  TeacherActionTypes.teachersLoaded,
  props<{ teachers: TeacherModel[] }>()
);
export const teacherRequestedAction = createAction(
  TeacherActionTypes.teacherRequested,
  props<{ teacherId: number }>()
);
export const teacherLoadedAction = createAction(
  TeacherActionTypes.teacherLoaded,
  props<{ teacher: TeacherModel }>()
);
export const teacherUpdateAction = createAction(
  TeacherActionTypes.teacherUpdate,
  props<{ teacher: TeacherModel }>()
);
export const teacherUpdatedAction = createAction(
  TeacherActionTypes.teacherUpdated,
  props<{ teacher: TeacherModel }>()
);
export const teacherCreateAction = createAction(
  TeacherActionTypes.teacherCreate,
  props<{ teacher: TeacherModel }>()
);
export const teacherCreatedAction = createAction(
  TeacherActionTypes.teacherCreated,
  props<{ teacher: TeacherModel }>()
);
