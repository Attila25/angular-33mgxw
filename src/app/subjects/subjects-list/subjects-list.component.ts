import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { SubjectsService } from '../subjects.service';
import { selectSubjects } from '../store/subjects.selectors';
import { subjectsRequestedAction } from '../store/subjects.actions';
import { SubjectModel } from '../store/subjects.model';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

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
    'semesterId',
    'semesters_s',
  ];

  private searchTerms = new Subject<string>();

  search(term: string): void {
    this.searchTerms.next(term);
    this.searchS();
  }

  subjects$: Observable<SubjectModel[]> = this.store.pipe(
    select(selectSubjects)
  );

  subjects_S$: Observable<SubjectModel[]>;

  constructor(private subjectsService: SubjectsService, private store: Store) {}

  ngOnInit() {
    this.subjects_S$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.subjectsService.searchSubjects(term))
    );
    this.store.dispatch(subjectsRequestedAction());
  }

  searchS() {
    this.subjects$ = this.subjects_S$;
  }
}
