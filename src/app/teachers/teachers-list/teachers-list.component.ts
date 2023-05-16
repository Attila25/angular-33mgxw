import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TeachersService } from '../teachers.service';
import { selectTeachers } from '../store/teachers.selectors';
import {
  teachersRequestedAction,
  teacherRequestedAction,
} from '../store/teachers.actions';
import { TeacherModel } from '../store/teachers.model';

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
  ];

  teachers$: Observable<TeacherModel[]> = this.store.pipe(
    select(selectTeachers)
  );

  constructor(private teachersService: TeachersService, private store: Store) {}

  ngOnInit() {
    this.store.dispatch(teachersRequestedAction());
  }
}
