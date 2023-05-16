import { createReducer, on, Action } from '@ngrx/store';
import { subjectCreateAction, subjectsLoadedAction } from './subjects.actions';
import { SubjectModel } from './subjects.model';

export const subjectsFeatureKey = 'subjectsFeature';

export interface SubjectsFeatureState {
  subjects: Array<SubjectModel>;
}

export const initialState: SubjectsFeatureState = {
  subjects: [],
};

export const subjectsReducer = createReducer(
  initialState,
  on(subjectsLoadedAction, (state, { subjects }) => ({ ...state, subjects })),
  on(subjectCreateAction, (state) => ({ ...state }))
);
