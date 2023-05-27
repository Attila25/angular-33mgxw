import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { TeacherTable } from './data/teachers.data';
import { SubjectTable } from './data/subjects.data';
import { StudentTable } from './data/students.data';
import { SemesterTable } from './data/semesters.data';

@Injectable()
export class InMemoryEventService implements InMemoryDbService {
  constructor() {}

  createDb() {
    const db = {
      teachers: TeacherTable.teachers,
      subjects: SubjectTable.subjects,
      students: StudentTable.students,
      semesters: SemesterTable.semesters,
    };
    return db;
  }
}
