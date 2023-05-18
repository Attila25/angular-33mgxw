import { createReducer, on, Action } from '@ngrx/store';
import {
  subjectCreateAction,
  subjectsLoadedAction,
  subjectLoadedAction,
} from './subjects.actions';
import { SubjectModel } from './subjects.model';

export const subjectsFeatureKey = 'subjectsFeature';

export interface SubjectsFeatureState {
  subjects: Array<SubjectModel>;
  loadedSubject: SubjectModel;
}

export const initialState: SubjectsFeatureState = {
  subjects: [],
  loadedSubject: null,
};

export const subjectsReducer = createReducer(
  initialState,
  on(subjectsLoadedAction, (state, { subjects }) => ({ ...state, subjects })),
  on(subjectLoadedAction, (state, { subject }) => ({
    ...state,
    loadedSubject: subject,
  })),
  on(subjectCreateAction, (state) => ({ ...state }))
);
