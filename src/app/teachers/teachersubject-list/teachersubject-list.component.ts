import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TeachersService } from '../teachers.service';
import { selectLoadedTeacher } from '../store/teachers.selectors';
import {
  teachersRequestedAction,
  teacherRequestedAction,
} from '../store/teachers.actions';
import { TeacherModel } from '../store/teachers.model';

@Component({
  selector: 'app-teachersubject-list',
  templateUrl: './teachersubject-list.component.html',
  styleUrls: ['./teachersubject-list.component.css'],
})
export class TeacherSubjectListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'neptun',
    'name',
    'email',
    'position',
    'subjectId',
  ];

  teacher: TeacherModel;

  constructor(private teachersService: TeachersService, private store: Store) {}

  ngOnInit() {
    this.getTeacher();
  }

  getTeacher(): void {
    this.teachersService
      .getTeacher(1)
      .subscribe((teacher) => (this.teacher = teacher));
  }
}
