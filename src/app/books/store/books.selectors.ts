import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../../app.module';
import { BookModel } from './books.model';
import { BooksFeatureState } from './books.reducer';
import { booksFeatureKey } from './books.reducer';

export const selectFeature = createFeatureSelector<AppState, BooksFeatureState>(booksFeatureKey);

export const selectBooks = createSelector(
  selectFeature,
  (state: BooksFeatureState) => {
    return state.books;
  }
)
export const selectNextBookId = createSelector(
  selectBooks,
  (books: BookModel[]) => {
    return books.length + 1;
  }
)