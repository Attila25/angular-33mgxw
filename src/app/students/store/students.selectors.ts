import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../../app.module';
import { StudentModel } from './students.model';
import { StudentsFeatureState, studentsFeatureKey } from './students.reducer';

export const selectFeature = createFeatureSelector<
  AppState,
  StudentsFeatureState
>(studentsFeatureKey);

export const selectStudents = createSelector(
  selectFeature,
  (state: StudentsFeatureState) => {
    return state.students;
  }
);
export const selectLoadedStudent = createSelector(
  selectFeature,
  (state: StudentsFeatureState) => {
    return state.loadedStudent;
  }
);
export const selectNextStudentId = createSelector(
  selectStudents,
  (students: StudentModel[]) => {
    return students.length + 1;
  }
);
