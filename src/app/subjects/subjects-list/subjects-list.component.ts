import { Component, ViewChild, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { SubjectsService } from '../subjects.service';
import { selectSubjects } from '../store/subjects.selectors';
import { subjectsRequestedAction } from '../store/subjects.actions';
import { SubjectModel } from '../store/subjects.model';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.css'],
})
export class SubjectsListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'neptun',
    'name',
    'credit',
    'department',
    'semesters_s',
  ];

  subjects$: Observable<SubjectModel[]> = this.store.pipe(
    select(selectSubjects)
  );

  dataSource = new MatTableDataSource<SubjectModel>();
  private searchSub$ = new Subject<string>();

  constructor(private subjectsService: SubjectsService, private store: Store) {}

  ngOnInit() {
    this.searchSub$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((filterValue: string) => {
        this.dataSource.filter = filterValue.trim().toLowerCase();
      });

    this.store.dispatch(subjectsRequestedAction());

    this.subjects$.subscribe(
      (data) => (this.dataSource = new MatTableDataSource(data))
    );
  }

  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    this.searchSub$.next(filterValue);
  }

  announceSortChange(sortState: Sort) {
    this.dataSource.sort = this.sort;
  }
}
