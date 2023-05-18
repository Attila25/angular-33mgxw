import { Component, ViewChild, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { SemestersService } from '../semesters.service';
import { selectSemesters } from '../store/semesters.selectors';
import { semestersRequestedAction } from '../store/semesters.actions';
import { SemesterModel } from '../store/semesters.model';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-semesters-list',
  templateUrl: './semesters-list.component.html',
  styleUrls: ['./semesters-list.component.css'],
})
export class SemestersListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'start_date', 'end_date'];

  semesters$: Observable<SemesterModel[]> = this.store.pipe(
    select(selectSemesters)
  );

  dataSource = new MatTableDataSource<SemesterModel>();
  private searchSub$ = new Subject<string>();

  constructor(
    private semestersService: SemestersService,
    private store: Store
  ) {}

  ngOnInit() {
    this.searchSub$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((filterValue: string) => {
        this.dataSource.filter = filterValue.trim().toLowerCase();
      });

    this.store.dispatch(semestersRequestedAction());

    this.semesters$.subscribe(
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
