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
    'subjects_t',
    'actions',
  ];
  teachers$: Observable<TeacherModel[]> = this.store.pipe(
    select(selectTeachers)
  );
  dataSource = new MatTableDataSource<TeacherModel>();
  private searchSub$ = new Subject<string>();

  constructor(private teachersService: TeachersService, private store: Store) {}

  ngOnInit() {
    this.searchSub$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((filterValue: string) => {
        this.dataSource.filter = filterValue.trim().toLowerCase();
      });

    this.store.dispatch(teachersRequestedAction());

    this.teachers$.subscribe(
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
