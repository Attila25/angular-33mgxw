import { Component, ViewChild, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { StudentsService } from '../students.service';
import { selectStudents } from '../store/students.selectors';
import { studentsRequestedAction } from '../store/students.actions';
import { StudentModel } from '../store/students.model';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
    'subjects_s',
  ];

  students$: Observable<StudentModel[]> = this.store.pipe(
    select(selectStudents)
  );

  dataSource = new MatTableDataSource<StudentModel>();
  private searchSub$ = new Subject<string>();

  constructor(private studentsService: StudentsService, private store: Store) {}

  ngOnInit() {
    this.searchSub$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((filterValue: string) => {
        this.dataSource.filter = filterValue.trim().toLowerCase();
      });

    this.store.dispatch(studentsRequestedAction());

    this.students$.subscribe(
      (data) => (this.dataSource = new MatTableDataSource(data))
    );
  }

  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    this.searchSub$.next(filterValue);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      console.log(`Sorted ${sortState.direction}ending`);
    } else {
      console.log('Sorting cleared');
    }

    this.dataSource.sort = this.sort;
  }
}
