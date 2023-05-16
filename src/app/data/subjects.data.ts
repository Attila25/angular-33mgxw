import { Semester, SemesterTable } from './semesters.data';

export interface Subject {
  id: number;
  neptun: string;
  name: string;
  credit: number;
  department: string;
  semesterId: number[];
  semesters_s: Semester[];
  deleted: boolean;
}

export class SubjectTable {
  public static _subjects: Subject[] = [
    {
      id: 1,
      neptun: 'DDD444',
      name: 'Matek',
      credit: 3,
      department: 'Mathematics',
      semesterId: [1],
      semesters_s: [],
      deleted: false,
    },
    {
      id: 2,
      neptun: 'EEE555',
      name: 'Info',
      credit: 5,
      department: 'RSZT',
      semesterId: [2],
      semesters_s: [],
      deleted: false,
    },
    {
      id: 3,
      neptun: 'FFF666',
      name: 'Angol',
      credit: 4,
      department: 'VIRT',
      semesterId: [1, 3],
      semesters_s: [],
      deleted: false,
    },
  ];

  public static subjects: Subject[] = SubjectTable._subjects.map((subject) => {
    subject.semesterId.forEach((x) => {
      const semester = SemesterTable.semesters.find(
        (a) => a.id === subject.semesterId[x - 1]
      );
      if (semester != undefined) subject.semesters_s.push(semester);
    });

    return subject;
  });
}
