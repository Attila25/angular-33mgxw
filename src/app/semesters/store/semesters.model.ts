import { Semester } from '../../data/semesters.data';

export class SemesterModel implements Semester {
  id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  deleted: boolean;
}
