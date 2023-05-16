import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { EventTable } from './event-list/events';
import { BookTable } from './data/books.data';
import { AuthorTable } from './data/authors.data';
import { TeacherTable } from './data/teachers.data';
import { SubjectTable } from './data/subjects.data';
import { StudentTable } from './data/students.data';
import { SemesterTable } from './data/semesters.data';

@Injectable()
export class InMemoryEventService implements InMemoryDbService {
  constructor() {}

  createDb() {
    const db = {
      events: EventTable.events,
      books: BookTable.books,
      authors: AuthorTable.authors,
      teachers: TeacherTable.teachers,
      subjects: SubjectTable.subjects,
      students: StudentTable.students,
      semesters: SemesterTable.semesters,
    };
    return db;
  }
}
