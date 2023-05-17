import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { SemestersService } from '../semesters.service';
import { selectSemesters } from '../store/semesters.selectors';
import { semestersRequestedAction } from '../store/semesters.actions';
import { SemesterModel } from '../store/semesters.model';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-semesters-list',
  templateUrl: './semesters-list.component.html',
  styleUrls: ['./semesters-list.component.css'],
})
export class SemestersListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'start_date', 'end_date'];

  private searchTerms = new Subject<string>();

  search(term: string): void {
    this.searchTerms.next(term);
    this.searchS();
  }

  semesters$: Observable<SemesterModel[]> = this.store.pipe(
    select(selectSemesters)
  );

  semesters_s$: Observable<SemesterModel[]>;

  constructor(
    private semestersService: SemestersService,
    private store: Store
  ) {}

  ngOnInit() {
    this.semesters_s$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.semestersService.searchSemesters(term))
    );

    this.store.dispatch(semestersRequestedAction());
  }
  searchS() {
    this.semesters$ = this.semesters_s$;
  }
}
