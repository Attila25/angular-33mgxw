import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectNextTeacherId } from '../store/teachers.selectors';
import {
  TeacherActionTypes,
  teachersLoadedAction,
  teacherCreateAction,
} from '../store/teachers.actions';
import { SubjectTable } from '../../data/subjects.data';
import { SubjectModel } from '../../subjects/store/subjects.model';
import { selectSubjects } from '../../subjects/store/subjects.selectors';
import { Observable } from 'rxjs';
import { subjectsRequestedAction } from '../../subjects/store/subjects.actions';
import { SubjectsService } from '../../subjects/subjects.service';

@Component({
  selector: 'app-teachers-create',
  templateUrl: './teachers-create.component.html',
  styleUrls: ['./teachers-create.component.css'],
})
export class TeachersCreateComponent implements OnInit {
  teachersForm: FormGroup;

  subject: SubjectModel;

  constructor(
    private subjectsService: SubjectsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.teachersForm = this.formBuilder.group({
      neptun: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
      name: [, [Validators.required]],
      email: [, [Validators.required]],
      position: [, [Validators.required]],
      subjectId: [, [Validators.required]],
      subjects_t: [[], []],
    });

    this.getSubject();
  }

  getSubject(): void {
    this.subjectsService
      .getSubject(1)
      .subscribe((subject) => (this.subject = subject));
  }

  onSubmit(teacherData: any) {
    teacherData.deleted = false;
    teacherData.subjects_t.push(this.subject.name);
    this.store.dispatch(teacherCreateAction(teacherData));
    this.teachersForm.reset();
    this.router.navigate(['/teachers']);
  }

  get neptun() {
    return this.teachersForm.get('neptun');
  }
  get name() {
    return this.teachersForm.get('name');
  }
  get email() {
    return this.teachersForm.get('email');
  }
  get position() {
    return this.teachersForm.get('position');
  }
  get subjectId() {
    return this.teachersForm.get('subjectId');
  }

  getNameErrorMessage() {
    if (this.name.dirty || this.name.touched) {
      if (this.name.hasError('minLength'))
        return 'You have to enter 6 characters!';
      if (this.name.hasError('maxLength'))
        return 'You have to enter 6 characters!';
    }
    return '';
  }
}
