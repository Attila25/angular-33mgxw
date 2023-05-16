import { createAction, props } from '@ngrx/store';
import { BookModel } from './books.model';

export enum BookActionTypes {
  booksRequested = '[Books] Books Requested',
  booksLoaded = '[Books] Books Loaded',
  bookCreate = '[Books] Book Create',
  bookCreated = '[Books] Book Created'
}

export const booksRequestedAction = createAction(
  BookActionTypes.booksRequested
);
export const booksLoadedAction = createAction(
  BookActionTypes.booksLoaded,
  props<{books: BookModel[]}>()
);
export const bookCreateAction = createAction(
  BookActionTypes.bookCreate,
  props<{book: BookModel}>()
);
export const bookCreatedAction = createAction(
  BookActionTypes.bookCreated,
  props<{author: BookModel}>()
);

/*export const deleteEvent = createAction(
  '[Events] Delete Event',
  props<{eventId}>()
);*/