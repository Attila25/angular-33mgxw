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
import { regExValidator } from '../../validators/regex.validator';

@Component({
  selector: 'app-teachers-create',
  templateUrl: './teachers-create.component.html',
  styleUrls: ['./teachers-create.component.css'],
})
export class TeachersCreateComponent implements OnInit {
  teachersForm: FormGroup;

  subjectConv: SubjectModel[];

  subjects$: Observable<SubjectModel[]> = this.store.pipe(
    select(selectSubjects)
  );

  constructor(
    private subjectsService: SubjectsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch(subjectsRequestedAction());

    this.teachersForm = this.formBuilder.group({
      neptun: [
        '',
        [Validators.required, regExValidator(/^(?!^\d)([a-zA-Z0-9]{6})$/i)],
      ],
      name: [, [Validators.required, Validators.maxLength(50)]],
      email: [, [Validators.required, Validators.email]],
      position: [, [Validators.required]],
      subjectId: [, [Validators.required]],
      subjects_t: [[], []],
    });
  }

  onSubmit(teacherData: any) {
    this.subjects$.subscribe((subject) => {
      this.subjectConv = subject as SubjectModel[];
    });

    teacherData.deleted = false;
    teacherData.subjectIds = teacherData.subjectId.split(',');

    teacherData.subjectIds.forEach((x) => {
      const subject = this.subjectConv.find((y) => y.id == x);

      if (subject != undefined) teacherData.subjects_t.push(subject.name);
    });

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

  getNeptunErrorMessage() {
    if (this.neptun.dirty || this.neptun.touched) {
      if (this.neptun.hasError('regEx'))
        return 'Can only consist of 6 letters or numbers. Firt character cant be number';
    }
    return '';
  }

  getNameErrorMessage() {
    if (this.name.dirty || this.name.touched) {
      if (this.name.hasError('required')) return 'You must enter a value!';
      if (this.name.hasError('maxlength'))
        return 'You can enter at most 50 characters!';
    }
    if (this.email.dirty || this.email.touched) {
      if (this.email.hasError('required')) return 'You must enter a value!';
    }
    if (this.position.dirty || this.position.touched) {
      if (this.position.hasError('required')) return 'You must enter a value!';
    }
    if (this.email.dirty || this.email.touched) {
      if (this.email.hasError('email')) return 'You must enter a valid email!';
    }
    return '';
  }
}
