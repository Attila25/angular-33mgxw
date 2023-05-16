import { Semester } from 'src/app/data/semesters.data';
import { Subject } from '../../data/subjects.data';
import { Teacher, Position } from '../../data/teachers.data';

export class SubjectModel implements Subject {
  id: number;
  neptun: string;
  name: string;
  credit: number;
  department: string;
  semesterId: number[];
  semesters_s: Semester[];
  deleted: boolean;
}
