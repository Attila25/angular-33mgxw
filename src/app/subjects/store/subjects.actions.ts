import { createAction, props } from '@ngrx/store';
import { SubjectModel } from './subjects.model';

export enum SubjectActionTypes {
  subjectsRequested = '[Subjects] Subjects Requested',
  subjectsLoaded = '[Subjects] Subjects Loaded',
  subjectCreate = '[Subjects] Subject Create',
  subjectCreated = '[Subjects] Subject Created',
  subjectRequested = '[Subjects] Subject Requested',
  subjectLoaded = '[Subjects] Subject Loaded',
  subjectUpdate = '[Subjects] Subject Update',
  subjectUpdated = '[Subjects] Subject Updated',
}

export const subjectsRequestedAction = createAction(
  SubjectActionTypes.subjectsRequested
);
export const subjectsLoadedAction = createAction(
  SubjectActionTypes.subjectsLoaded,
  props<{ subjects: SubjectModel[] }>()
);
export const subjectRequestedAction = createAction(
  SubjectActionTypes.subjectRequested,
  props<{ subjectId: number }>()
);
export const subjectLoadedAction = createAction(
  SubjectActionTypes.subjectLoaded,
  props<{ subject: SubjectModel }>()
);
export const subjectUpdateAction = createAction(
  SubjectActionTypes.subjectUpdate,
  props<{ subject: SubjectModel }>()
);
export const subjectUpdatedAction = createAction(
  SubjectActionTypes.subjectUpdated,
  props<{ subject: SubjectModel }>()
);
export const subjectCreateAction = createAction(
  SubjectActionTypes.subjectCreate,
  props<{ subject: SubjectModel }>()
);
export const subjectCreatedAction = createAction(
  SubjectActionTypes.subjectCreated,
  props<{ subject: SubjectModel }>()
);
