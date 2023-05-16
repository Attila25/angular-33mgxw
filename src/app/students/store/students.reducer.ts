import { createReducer, on, Action } from '@ngrx/store';
import { studentCreateAction, studentsLoadedAction } from './students.actions';
import { StudentModel } from './students.model';

export const studentsFeatureKey = 'studentsFeature';

export interface StudentsFeatureState {
  students: Array<StudentModel>;
}

export const initialState: StudentsFeatureState = {
  students: [],
};

export const studentsReducer = createReducer(
  initialState,
  on(studentsLoadedAction, (state, { students }) => ({ ...state, students })),
  on(studentCreateAction, (state) => ({ ...state }))
);
