import { Subject } from './subjects.data';
import { SubjectTable } from './subjects.data';

export enum Course {
  COMPUTER_ENGINEER_MSC = 'Computer Engineer Msc',
  COMPUTER_PROGRAMMER_MSC = 'Computer Programmer Msc',
  COMPUTER_ENGINEER_BSC = 'Computer Engineer Bsc',
  COMPUTER_PROGRAMMER_BSC = 'Computer Programmer Bsc',
  COMPUTER_ECONOMIST_BSC = 'Computer Economist Bsc',
}

export interface Student {
  id: number;
  neptun: string;
  name: string;
  email: string;
  course: Course;
  subjectId: number[];
  subjects_s: string[];
  deleted: boolean;
}

export class StudentTable {
  public static _students: Student[] = [
    {
      id: 1,
      neptun: 'GGG777',
      name: 'Varga László',
      email: 'val@gmail.com',
      course: Course.COMPUTER_ENGINEER_BSC,
      subjectId: [1, 2],
      subjects_s: [],
      deleted: false,
    },
    {
      id: 2,
      neptun: 'HHH888',
      name: 'Kovács Pál',
      email: 'kop@gmail.com',
      course: Course.COMPUTER_PROGRAMMER_BSC,
      subjectId: [1],
      subjects_s: [],
      deleted: false,
    },
    {
      id: 3,
      neptun: 'JJJ999',
      name: 'Horváth Gábor',
      email: 'hog@gmail.com',
      course: Course.COMPUTER_ENGINEER_MSC,
      subjectId: [2, 3],
      subjects_s: [],
      deleted: false,
    },
  ];
  public static students: Student[] = StudentTable._students.map((student) => {
    student.subjectId.forEach((x) => {
      const subject = SubjectTable._subjects.find(
        (a) => a.id === student.subjectId[x - 1]
      );
      if (subject != undefined) student.subjects_s.push(subject.name);
    });
    return student;
  });
}
