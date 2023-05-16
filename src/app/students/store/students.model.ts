import { Subject } from '../../data/subjects.data';
import { Student, Course } from '../../data/students.data';

export class StudentModel implements Student {
  id: number;
  neptun: string;
  name: string;
  email: string;
  course: Course;
  subjectId: number[];
  subjects_s: string[];
  deleted: boolean;
}
