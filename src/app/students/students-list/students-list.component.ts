import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StudentsService } from '../students.service';
import { selectStudents } from '../store/students.selectors';
import { studentsRequestedAction } from '../store/students.actions';
import { StudentModel } from '../store/students.model';

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
    'subjectId',
  ];

  students$: Observable<StudentModel[]> = this.store.pipe(
    select(selectStudents)
  );

  constructor(private studentsService: StudentsService, private store: Store) {}

  ngOnInit() {
    this.store.dispatch(studentsRequestedAction());
  }
}
