import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { StudentsService } from '../students.service';
import { selectStudents } from '../store/students.selectors';
import { studentsRequestedAction } from '../store/students.actions';
import { StudentModel } from '../store/students.model';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css'],
})
export class StudentsListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'neptun',
    'name',
    'email',
    'course',
    'subjectId',
    'subjects_s',
  ];

  private searchTerms = new Subject<string>();

  search(term: string): void {
    this.searchTerms.next(term);
    this.searchS();
  }

  students$: Observable<StudentModel[]> = this.store.pipe(
    select(selectStudents)
  );

  students_S$: Observable<StudentModel[]>;

  constructor(private studentsService: StudentsService, private store: Store) {}

  ngOnInit() {
    this.students_S$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.studentsService.searchStudents(term))
    );
    this.store.dispatch(studentsRequestedAction());
  }

  searchS() {
    this.students$ = this.students_S$;
  }
}
