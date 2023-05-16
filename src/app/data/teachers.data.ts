import { Subject } from './subjects.data';
import { SubjectTable } from './subjects.data';

export enum Position {
  ASSOCIATE_PROFESSOR = 'Associate Professor',
  ASSISTANT_PROFESSOR = 'Assistant Professor',
  MASTER_TEACHER = 'Master Teacher',
  ACTING_EXPERT = 'Acting Expert',
  TEACHING_ASSISTANT = 'Teaching Assistant',
  OTHER = 'Other',
}

export interface Teacher {
  id: number;
  neptun: string;
  name: string;
  email: string;
  position: Position;
  subjectId: number[];
  subjects_t: string[];
  deleted: boolean;
}

export class TeacherTable {
  public static _teachers: Teacher[] = [
    {
      id: 1,
      neptun: 'AAA111',
      name: 'Nagy László',
      email: 'tanar@gmail.com',
      position: Position.ASSISTANT_PROFESSOR,
      subjectId: [2, 3],
      subjects_t: [],
      deleted: false,
    },
    {
      id: 2,
      neptun: 'BBB222',
      name: 'Kiss József',
      email: 'prof@gmail.com',
      position: Position.ASSOCIATE_PROFESSOR,
      subjectId: [3, 1],
      subjects_t: [],
      deleted: false,
    },
    {
      id: 3,
      neptun: 'CCC333',
      name: 'Papp Károly',
      email: 'exp@gmail.com',
      position: Position.ACTING_EXPERT,
      subjectId: [1, 3],
      subjects_t: [],
      deleted: false,
    },
  ];
  public static teachers: Teacher[] = TeacherTable._teachers.map((teacher) => {
    teacher.subjectId.forEach((x) => {
      const subject = SubjectTable._subjects.find((a) => a.id === x);
      if (subject != undefined) teacher.subjects_t.push(subject.name);
    });
    return teacher;
  });
}
