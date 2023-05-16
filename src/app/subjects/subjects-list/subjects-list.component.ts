import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SubjectsService } from '../subjects.service';
import { selectSubjects } from '../store/subjects.selectors';
import { subjectsRequestedAction } from '../store/subjects.actions';
import { SubjectModel } from '../store/subjects.model';

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
  ];

  subjects$: Observable<SubjectModel[]> = this.store.pipe(
    select(selectSubjects)
  );

  constructor(private subjectsService: SubjectsService, private store: Store) {}

  ngOnInit() {
    this.store.dispatch(subjectsRequestedAction());
  }
}
