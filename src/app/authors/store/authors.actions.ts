import { createAction, props } from '@ngrx/store';
import { AuthorModel } from './authors.model';

export enum AuthorActionTypes {
  authorsRequested = '[Authors] Authors Requested',
  authorsLoaded = '[Authors] Authors Loaded',
  authorCreate = '[Authors] Author Create',
  authorCreated = '[Authors] Author Created',
  authorRequested = '[Authors] Author Requested',
  authorLoaded = '[Authors] Author Loaded',
  authorUpdate = '[Authors] Author Update',
  authorUpdated = '[Authors] Author Updated',
  authorDelete = '[Authors] Author Delete',
  authorDeleted = '[Authors] Author Deleted'
}

export const authorsRequestedAction = createAction(
  AuthorActionTypes.authorsRequested
);
export const authorsLoadedAction = createAction(
  AuthorActionTypes.authorsLoaded,
  props<{authors: AuthorModel[]}>()
);
export const authorCreateAction = createAction(
  AuthorActionTypes.authorCreate,
  props<{author: AuthorModel}>()
);
export const authorCreatedAction = createAction(
  AuthorActionTypes.authorCreated,
  props<{author: AuthorModel}>()
);
export const authorRequestedAction = createAction(
  AuthorActionTypes.authorRequested,
  props<{authorId: number}>()
);
export const authorLoadedAction = createAction(
  AuthorActionTypes.authorLoaded,
  props<{author: AuthorModel}>()
);
export const authorUpdateAction = createAction(
  AuthorActionTypes.authorUpdate,
  props<{author: AuthorModel}>()
);
export const authorUpdatedAction = createAction(
  AuthorActionTypes.authorUpdated,
  props<{author: AuthorModel}>()
);
export const authorDeleteAction = createAction(
  AuthorActionTypes.authorDelete,
  props<{author: AuthorModel}>()
);
export const authorDeletedAction = createAction(
  AuthorActionTypes.authorDeleted,
  props<{author: AuthorModel}>()
);

/*export const deleteEvent = createAction(
  '[Events] Delete Event',
  props<{eventId}>()
);*/