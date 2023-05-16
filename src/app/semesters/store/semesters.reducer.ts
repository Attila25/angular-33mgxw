import { createReducer, on, Action } from '@ngrx/store';
import {
  semesterCreateAction,
  semestersLoadedAction,
} from './semesters.actions';
import { SemesterModel } from './semesters.model';

export const semestersFeatureKey = 'semestersFeature';

export interface SemestersFeatureState {
  semesters: Array<SemesterModel>;
}

export const initialState: SemestersFeatureState = {
  semesters: [],
};

export const semestersReducer = createReducer(
  initialState,
  on(semestersLoadedAction, (state, { semesters }) => ({
    ...state,
    semesters,
  })),
  on(semesterCreateAction, (state) => ({ ...state }))
);
