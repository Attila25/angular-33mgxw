import { createReducer, on, Action } from '@ngrx/store';
import {
  studentCreateAction,
  studentsLoadedAction,
  studentLoadedAction,
} from './students.actions';
import { StudentModel } from './students.model';

export const studentsFeatureKey = 'studentsFeature';

export interface StudentsFeatureState {
  students: Array<StudentModel>;
  loadedStudent: StudentModel;
}

export const initialState: StudentsFeatureState = {
  students: [],
  loadedStudent: null,
};

export const studentsReducer = createReducer(
  initialState,
  on(studentsLoadedAction, (state, { students }) => ({ ...state, students })),
  on(studentLoadedAction, (state, { student }) => ({
    ...state,
    loadedStudent: student,
  })),
  on(studentCreateAction, (state) => ({ ...state }))
);
