import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../../app.module';
import { AuthorModel } from './authors.model';
import { AuthorsFeatureState } from './authors.reducer';
import { authorsFeatureKey } from './authors.reducer';

export const selectFeature = createFeatureSelector<AppState, AuthorsFeatureState>(authorsFeatureKey);

export const selectAuthors = createSelector(
  selectFeature,
  (state: AuthorsFeatureState) => {
    return state.authors;
  }
)
export const selectLoadedAuthor = createSelector(
  selectFeature,
  (state: AuthorsFeatureState) => {
    return state.loadedAuthor;
  }
)
export const selectNextAuthorId = createSelector(
  selectAuthors,
  (authors: AuthorModel[]) => {
    return authors.length + 1;
  }
)