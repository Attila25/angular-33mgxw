import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject} from 'rxjs';
import { TeachersService } from '../teachers.service';
import { selectTeachers } from '../store/teachers.selectors';
import {
  teachersRequestedAction,
  teacherRequestedAction,
} from '../store/teachers.actions';
import { TeacherModel } from '../store/teachers.model';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-teacher-search',
  templateUrl: './teacher-search.component.html',
  styleUrls: ['./teacher-search.component.css'],
})
export class TeacherSearchComponent implements OnInit {
  teachers$!: Observable<TeacherModel[]>;
  private searchTerms = new Subject<string>();

  constructor(private teachersService: TeachersService, private store: Store) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.teachers$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.teachersService.searchTeachers(term))
    );
  }
}
