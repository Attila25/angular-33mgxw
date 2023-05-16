import { createReducer, on, Action } from '@ngrx/store';
import {
  teacherCreateAction,
  teachersLoadedAction,
  teacherLoadedAction,
} from './teachers.actions';
import { TeacherModel } from './teachers.model';

export const teachersFeatureKey = 'teachersFeature';

export interface TeachersFeatureState {
  teachers: Array<TeacherModel>;
  teacher: TeacherModel;
}

export const initialState: TeachersFeatureState = {
  teachers: [],
  teacher: null,
};

export const teachersReducer = createReducer(
  initialState,
  on(teachersLoadedAction, (state, { teachers }) => ({ ...state, teachers })),
  on(teacherLoadedAction, (state, { teacher }) => ({
    ...state,
    teacher,
  })),
  on(teacherCreateAction, (state) => ({ ...state }))
);
