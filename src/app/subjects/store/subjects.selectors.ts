import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../../app.module';
import { SubjectModel } from './subjects.model';
import { SubjectsFeatureState, subjectsFeatureKey } from './subjects.reducer';

export const selectFeature = createFeatureSelector<
  AppState,
  SubjectsFeatureState
>(subjectsFeatureKey);

export const selectSubjects = createSelector(
  selectFeature,
  (state: SubjectsFeatureState) => {
    return state.subjects;
  }
);

export const selectLoadedSubject = createSelector(
  selectFeature,
  (state: SubjectsFeatureState) => {
    return state.loadedSubject;
  }
);

export const selectNextSubjectId = createSelector(
  selectSubjects,
  (subjects: SubjectModel[]) => {
    return subjects.length + 1;
  }
);
