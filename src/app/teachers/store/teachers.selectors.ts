import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../../app.module';
import { TeacherModel } from './teachers.model';
import { TeachersFeatureState, teachersFeatureKey } from './teachers.reducer';

export const selectFeature = createFeatureSelector<
  AppState,
  TeachersFeatureState
>(teachersFeatureKey);

export const selectTeachers = createSelector(
  selectFeature,
  (state: TeachersFeatureState) => {
    return state.teachers;
  }
);
export const selectLoadedTeacher = createSelector(
  selectFeature,
  (state: TeachersFeatureState) => {
    return state.loadedTeacher;
  }
);

export const selectNextTeacherId = createSelector(
  selectTeachers,
  (teachers: TeacherModel[]) => {
    return teachers.length + 1;
  }
);
