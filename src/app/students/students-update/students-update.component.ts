import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import {
  selectLoadedStudent,
  selectNextStudentId,
} from '../store/students.selectors';
import {
  StudentActionTypes,
  studentsLoadedAction,
  studentCreateAction,
  studentRequestedAction,
  studentUpdateAction,
} from '../store/students.actions';
import { SubjectTable } from '../../data/subjects.data';
import { SubjectModel } from '../../subjects/store/subjects.model';
import { selectSubjects } from '../../subjects/store/subjects.selectors';
import { Observable } from 'rxjs';
import { subjectsRequestedAction } from '../../subjects/store/subjects.actions';
import { SubjectsService } from '../../subjects/subjects.service';
import { regExValidator } from '../../validators/regex.validator';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-students-update',
  templateUrl: './students-update.component.html',
  styleUrls: ['./students-update.component.css'],
})
export class StudentsUpdateComponent implements OnInit {
  studentsForm: FormGroup;
  subjectConv: SubjectModel[];

  subjects$: Observable<SubjectModel[]> = this.store.pipe(
    select(selectSubjects)
  );

  constructor(
    private route: ActivatedRoute,
    private subjectsService: SubjectsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((params) => {
          return this.store.dispatch(
            studentRequestedAction({ studentId: +params.get('studentId') })
          );
        })
      )
      .subscribe();
    this.store.pipe(select(selectLoadedStudent)).subscribe((student) => {
      if (student && this.studentsForm) {
        this.studentsForm.controls.id.setValue(student.id);
        this.studentsForm.controls.neptun.setValue(student.neptun);
        this.studentsForm.controls.name.setValue(student.name);
        this.studentsForm.controls.email.setValue(student.email);
        this.studentsForm.controls.course.setValue(student.course);
        this.studentsForm.controls.subjectId.setValue(student.subjectId);
      }
    });

    this.studentsForm = this.formBuilder.group({
      id: [{ value: 0, disabled: true }, [Validators.required]],
      neptun: [
        '',
        [Validators.required, regExValidator(/^(?!^\d)([a-zA-Z0-9]{6})$/i)],
      ],
      name: [, [Validators.required, Validators.maxLength(50)]],
      email: [, [Validators.required, Validators.email]],
      course: [, [Validators.required]],
      subjectId: [, [Validators.required]],
      subjects_s: [[], []],
      deleted: [false],
    });

    this.store.dispatch(subjectsRequestedAction());
  }

  onSubmit(studentData: any) {
    this.subjects$.subscribe((subject) => {
      this.subjectConv = subject as SubjectModel[];
    });

    studentData.deleted = false;
    studentData.subjectIds = studentData.subjectId.split(',');

    studentData.subjectIds.forEach((x) => {
      const subject = this.subjectConv.find((y) => y.id == x);
      console.log(this.subjectConv);
      if (subject != undefined) studentData.subjects_s.push(subject.name);
    });

    this.store.dispatch(studentUpdateAction(studentData));
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
