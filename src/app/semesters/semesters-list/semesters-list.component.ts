import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SemestersService } from '../semesters.service';
import { selectSemesters } from '../store/semesters.selectors';
import { semestersRequestedAction } from '../store/semesters.actions';
import { SemesterModel } from '../store/semesters.model';

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

  constructor(
    private semestersService: SemestersService,
    private store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch(semestersRequestedAction());
  }
}
