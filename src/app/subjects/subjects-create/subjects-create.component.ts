import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectNextSubjectId } from '../store/subjects.selectors';
import {
  SubjectActionTypes,
  subjectsLoadedAction,
  subjectCreateAction,
} from '../store/subjects.actions';
import { SubjectTable } from '../../data/subjects.data';
import { SubjectModel } from '../../subjects/store/subjects.model';
import { selectSubjects } from '../../subjects/store/subjects.selectors';
import { Observable } from 'rxjs';
import { subjectsRequestedAction } from '../../subjects/store/subjects.actions';
import { SubjectsService } from '../../subjects/subjects.service';
import { regExValidator } from '../../validators/regex.validator';
import { SemesterModel } from '../../semesters/store/semesters.model';
import { SemestersService } from '../../semesters/semesters.service';
import { selectSemesters } from '../../semesters/store/semesters.selectors';
import { semestersRequestedAction } from '../../semesters/store/semesters.actions';

@Component({
  selector: 'app-subjects-create',
  templateUrl: './subjects-create.component.html',
  styleUrls: ['./subjects-create.component.css'],
})
export class SubjectsCreateComponent implements OnInit {
  subjectsForm: FormGroup;

  semesterConv: SemesterModel[];

  semesters$: Observable<SemesterModel[]> = this.store.pipe(
    select(selectSemesters)
  );

  constructor(
    private semestersService: SemestersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.subjectsForm = this.formBuilder.group({
      neptun: [
        '',
        [Validators.required, regExValidator(/^(?!^\d)([a-zA-Z0-9]{6})$/i)],
      ],
      name: [, [Validators.required, Validators.maxLength(50)]],
      credit: [, [Validators.required]],
      department: [, [Validators.required]],
      semesterId: [, [Validators.required]],
      semesters_s: [[], []],
    });

    this.store.dispatch(semestersRequestedAction());
  }

  onSubmit(subjectData: any) {
    this.semesters$.subscribe((semester) => {
      this.semesterConv = semester as SemesterModel[];
    });

    subjectData.deleted = false;
    subjectData.semesterIds = subjectData.semesterId.split(',');

    subjectData.semesterIds.forEach((x) => {
      const semester = this.semesterConv.find((y) => y.id == x);

      if (semester != undefined) subjectData.semesters_s.push(semester.name);
    });

    this.store.dispatch(subjectCreateAction(subjectData));
    this.subjectsForm.reset();
    this.router.navigate(['/subjects']);
  }

  get neptun() {
    return this.subjectsForm.get('neptun');
  }
  get name() {
    return this.subjectsForm.get('name');
  }
  get credit() {
    return this.subjectsForm.get('credit');
  }
  get department() {
    return this.subjectsForm.get('department');
  }
  get semesterId() {
    return this.subjectsForm.get('semesterId');
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
    if (this.credit.dirty || this.credit.touched) {
      if (this.credit.hasError('required')) return 'You must enter a value!';
    }
    if (this.department.dirty || this.department.touched) {
      if (this.department.hasError('required'))
        return 'You must enter a value!';
    }
    return '';
  }
}
