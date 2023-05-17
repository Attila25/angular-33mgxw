import { Component, ViewChild, OnInit } from '@angular/core';
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
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

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

  dataSource = new MatTableDataSource<TeacherModel>();

  teachers_s$: Observable<TeacherModel[]>;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private teachersService: TeachersService,
    private store: Store
  ) {}

  ngOnInit() {
    this.teachers_s$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.teachersService.searchTeachers(term))
    );

    this.teachers$.subscribe(
      (data) => (this.dataSource = new MatTableDataSource(data))
    );

    this.store.dispatch(teachersRequestedAction());
  }
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  searchT() {
    this.teachers$ = this.teachers_s$;
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
