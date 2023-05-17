import { Component, OnChanges, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { TeachersService } from '../teachers.service';
import { selectTeachers } from '../store/teachers.selectors';
import {
  teachersRequestedAction,
  teacherRequestedAction,
} from '../store/teachers.actions';
import { TeacherModel } from '../store/teachers.model';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.css'],
})
export class TeachersListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'neptun',
    'name',
    'email',
    'position',
    'subjectId',
    'subjects_t',
  ];

  private searchTerms = new Subject<string>();

  search(term: string): void {
    this.searchTerms.next(term);
    this.searchT();
  }

  teachers$: Observable<TeacherModel[]> = this.store.pipe(
    select(selectTeachers)
  );

  teachers_s$: Observable<TeacherModel[]>;

  constructor(private teachersService: TeachersService, private store: Store) {}

  ngOnInit() {
    this.teachers_s$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.teachersService.searchTeachers(term))
    );
    this.store.dispatch(teachersRequestedAction());
  }
  searchT() {
    this.teachers$ = this.teachers_s$;
  }
}
