import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectLoadedSubject } from '../store/subjects.selectors';
import {
  subjectRequestedAction,
  subjectUpdateAction,
} from '../store/subjects.actions';

import { Observable } from 'rxjs';
import { SemesterModel } from '../../semesters/store/semesters.model';
import { selectSemesters } from '../../semesters/store/semesters.selectors';
import { semestersRequestedAction } from '../../semesters/store/semesters.actions';
import { SubjectsService } from '../../subjects/subjects.service';
import { regExValidator } from '../../validators/regex.validator';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-subjects-update',
  templateUrl: './subjects-update.component.html',
  styleUrls: ['./subjects-update.component.css'],
})
export class SubjectsUpdateComponent implements OnInit {
  subjectsForm: FormGroup;
  semesterConv: SemesterModel[];

  semesters$: Observable<SemesterModel[]> = this.store.pipe(
    select(selectSemesters)
  );

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((params) => {
          return this.store.dispatch(
            subjectRequestedAction({ subjectId: +params.get('subjectId') })
          );
        })
      )
      .subscribe();
    this.store.pipe(select(selectLoadedSubject)).subscribe((subject) => {
      if (subject && this.subjectsForm) {
        this.subjectsForm.controls.id.setValue(subject.id);
        this.subjectsForm.controls.neptun.setValue(subject.neptun);
        this.subjectsForm.controls.name.setValue(subject.name);
        this.subjectsForm.controls.credit.setValue(subject.credit);
        this.subjectsForm.controls.department.setValue(subject.department);
        this.subjectsForm.controls.semesterId.setValue(subject.semesterId);
      }
    });

    this.subjectsForm = this.formBuilder.group({
      id: [{ value: 0, disabled: true }, [Validators.required]],
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

    this.store.dispatch(subjectUpdateAction(subjectData));
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
