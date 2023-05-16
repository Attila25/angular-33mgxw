import { createReducer, on, Action } from '@ngrx/store';

import { authorsLoadedAction } from './authors.actions';
import { authorCreateAction } from './authors.actions';
import { authorLoadedAction } from './authors.actions';
import { AuthorModel } from './authors.model';

export const authorsFeatureKey = 'authorsFeature';

export interface AuthorsFeatureState {
  authors: Array<AuthorModel>;
  loadedAuthor: AuthorModel;
}

export const initialState: AuthorsFeatureState = {
  authors: [],
  loadedAuthor: null
};

export const authorsReducer = createReducer(
  initialState,
  on(authorsLoadedAction, (state, {authors}) => ({...state, authors})),
  on(authorLoadedAction, (state, {author}) => ({
    ...state, 
    loadedAuthor: author
  })),
  on(authorCreateAction, (state) => ({...state}))
)