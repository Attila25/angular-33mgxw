import { createAction, props } from '@ngrx/store';
import { SubjectModel } from './subjects.model';

export enum SubjectActionTypes {
  subjectsRequested = '[Subjects] Subjects Requested',
  subjectsLoaded = '[Subjects] Subjects Loaded',
  subjectCreate = '[Subjects] Subject Create',
  subjectCreated = '[Subjects] Subject Created',
}

export const subjectsRequestedAction = createAction(
  SubjectActionTypes.subjectsRequested
);
export const subjectsLoadedAction = createAction(
  SubjectActionTypes.subjectsLoaded,
  props<{ subjects: SubjectModel[] }>()
);
export const subjectCreateAction = createAction(
  SubjectActionTypes.subjectCreate,
  props<{ subject: SubjectModel }>()
);
export const subjectCreatedAction = createAction(
  SubjectActionTypes.subjectCreated,
  props<{ subject: SubjectModel }>()
);
