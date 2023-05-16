import { createReducer, on, Action } from '@ngrx/store';

import { booksLoadedAction } from './books.actions';
import { bookCreateAction } from './books.actions';
//import { authorCreatedAction } from './authors.actions';
import { BookModel } from './books.model';

export const booksFeatureKey = 'booksFeature';

export interface BooksFeatureState {
  books: Array<BookModel>;
}

export const initialState: BooksFeatureState = {
  books: []
};

export const booksReducer = createReducer(
  initialState,
  on(booksLoadedAction, (state, {books}) => ({...state, books})),
  on(bookCreateAction, (state) => ({...state}))
)