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

@Component({
  selector: 'app-teachers-create',
  templateUrl: './teachers-create.component.html',
  styleUrls: ['./teachers-create.component.css'],
})
export class TeachersCreateComponent implements OnInit {
  teachersForm: FormGroup;

  subjects: Array<SubjectModel[]> = this.store.pipe(select(selectSubjects));

  constructor(
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
    });
  }

  onSubmit(teacherData: any) {
    teacherData.deleted = false;
    if (teacherData.subjectId.length != 1) {
      teacherData.subjectId.forEach((x) => {
        const subject = this.subjects.find((a) => a.id === x);
        if (subject != undefined) teacherData.subjects_t.push(subject.name);
      });
    } else {
      const subject = this.subjects.find((a) => a.id === teacherData.subjectId);
      if (subject != undefined) teacherData.subjects_t.push(subject.name);
      console.log(subject.name);
    }

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
