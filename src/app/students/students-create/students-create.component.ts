import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectNextStudentId } from '../store/students.selectors';
import {
  StudentActionTypes,
  studentsLoadedAction,
  studentCreateAction,
} from '../store/students.actions';
import { SubjectTable } from '../../data/subjects.data';
import { SubjectModel } from '../../subjects/store/subjects.model';
import { selectSubjects } from '../../subjects/store/subjects.selectors';
import { Observable } from 'rxjs';
import { subjectsRequestedAction } from '../../subjects/store/subjects.actions';
import { SubjectsService } from '../../subjects/subjects.service';
import { regExValidator } from '../../validators/regex.validator';

@Component({
  selector: 'app-students-create',
  templateUrl: './students-create.component.html',
  styleUrls: ['./students-create.component.css'],
})
export class StudentsCreateComponent implements OnInit {
  studentsForm: FormGroup;

  subject: SubjectModel;

  constructor(
    private subjectsService: SubjectsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.studentsForm = this.formBuilder.group({
      neptun: [
        '',
        [Validators.required, regExValidator(/^(?!^\d)([a-zA-Z0-9]{6})$/i)],
      ],
      name: [, [Validators.required, Validators.maxLength(50)]],
      email: [, [Validators.required, Validators.email]],
      course: [, [Validators.required]],
      subjectId: [, [Validators.required]],
      subjects_: [[], []],
    });

    this.getSubject();
  }

  getSubject(): void {
    this.subjectsService
      .getSubject(1)
      .subscribe((subject) => (this.subject = subject));
  }

  onSubmit(studentData: any) {
    studentData.deleted = false;
    studentData.subjects_s.push(this.subject.name);
    this.store.dispatch(studentCreateAction(studentData));
    this.studentsForm.reset();
    this.router.navigate(['/students']);
  }

  get neptun() {
    return this.studentsForm.get('neptun');
  }
  get name() {
    return this.studentsForm.get('name');
  }
  get email() {
    return this.studentsForm.get('email');
  }
  get course() {
    return this.studentsForm.get('course');
  }
  get subjectId() {
    return this.studentsForm.get('subjectId');
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
    if (this.course.dirty || this.course.touched) {
      if (this.course.hasError('required')) return 'You must enter a value!';
    }
    if (this.email.dirty || this.email.touched) {
      if (this.email.hasError('email')) return 'You must enter a valid email!';
    }
    return '';
  }
}
